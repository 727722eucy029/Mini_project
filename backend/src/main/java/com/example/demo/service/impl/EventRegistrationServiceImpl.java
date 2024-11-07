package com.example.demo.service.impl;

import com.example.demo.dto.EventRegistrationDto;
import com.example.demo.entity.EventEntity;
import com.example.demo.entity.EventRegistration;
import com.example.demo.entity.ProfileEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.EventRegistrationMapper;
import com.example.demo.mapper.ProfileMapper;
import com.example.demo.repository.EventRegistrationRepository;
import com.example.demo.service.EventRegistrationService;
import com.example.demo.service.EventService;
import com.example.demo.service.ProfileService;
import com.example.demo.service.UserService;

import lombok.AllArgsConstructor;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
@AllArgsConstructor
public class EventRegistrationServiceImpl implements EventRegistrationService {
	private static final Logger logger = LoggerFactory.getLogger(EventRegistrationServiceImpl.class);

    private final EventRegistrationRepository registrationRepository;
    private final EventService eventService;
    private final UserService userService;
    private final ProfileService profileService;

    @Override
    public EventRegistrationDto registerUserForEvent(Long eventId, String email, EventRegistrationDto registrationDto) {
        EventEntity event = eventService.getEventById(eventId);
        UserEntity user = userService.getUserByEmail(email);
        ProfileEntity profile = ProfileMapper.mapToProfile(profileService.getProfileByEmail(email));
        logger.info("Attempting to retrieve user with email: {}", email);
        
        EventRegistration registration = new EventRegistration();
        registration.setEvent(event);
        registration.setUser(user);

        registration.setProfile(profile);


        EventRegistration savedRegistration = registrationRepository.save(registration);

        return EventRegistrationMapper.mapToEventRegistrationDto(savedRegistration);
    }
    @Override
    public List<EventRegistration> getRegisteredUsersForEvent(Long eventId) {
        // Fetch all event registrations for a given eventId
        return registrationRepository.findByEventId(eventId);
    }

    @Override
    public List<EventRegistrationDto> getRegistrationsByEventId(Long eventId) {
        List<EventRegistration> registrations = registrationRepository.findByEventId(eventId);

        // Convert EventRegistration entities to EventRegistrationDto
        return registrations.stream()
                .map(EventRegistrationMapper::mapToEventRegistrationDto)  // Assuming EventRegistrationMapper handles the conversion
                .collect(Collectors.toList());
    }

    @Override
    public List<EventRegistrationDto> getAllRegistrations() {
        // Retrieving all registrations and mapping to DTOs
        List<EventRegistration> registrations = registrationRepository.findAll();
        return registrations.stream()
                .map(EventRegistrationMapper::mapToEventRegistrationDto)
                .collect(Collectors.toList());
    }

    @Override
    public EventRegistrationDto getRegistrationById(Long registrationId) {
        // Retrieving registration by ID and mapping to DTO
        EventRegistration registration = registrationRepository.findById(registrationId).orElseThrow(
                () -> new ResourceNotFoundException("Registration not found with ID: " + registrationId)
        );
        return EventRegistrationMapper.mapToEventRegistrationDto(registration);
    }

    @Override
    public void deleteRegistration(Long registrationId) {
        // Checking if registration exists, then deleting it
        registrationRepository.findById(registrationId).orElseThrow(
                () -> new ResourceNotFoundException("Registration not found with ID: " + registrationId)
        );
        registrationRepository.deleteById(registrationId);
    }
}
