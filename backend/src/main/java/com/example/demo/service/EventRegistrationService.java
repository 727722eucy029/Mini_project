package com.example.demo.service;

import com.example.demo.dto.EventRegistrationDto;
import com.example.demo.entity.EventRegistration;

import java.util.List;

public interface EventRegistrationService {
	EventRegistrationDto registerUserForEvent(Long eventId, String email, EventRegistrationDto registrationDto);
    List<EventRegistrationDto> getAllRegistrations();
    EventRegistrationDto getRegistrationById(Long registrationId);
    void deleteRegistration(Long registrationId);
	List<EventRegistration> getRegisteredUsersForEvent(Long eventId);
	List<EventRegistrationDto> getRegistrationsByEventId(Long eventId);
}
