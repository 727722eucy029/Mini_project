package com.example.demo.mapper;

import com.example.demo.dto.EventRegistrationDto;
import com.example.demo.dto.ProfileDto;
import com.example.demo.entity.ProfileEntity;
import com.example.demo.entity.EventRegistration;
import com.example.demo.entity.Interest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProfileMapper {

    public static ProfileEntity mapToProfile(ProfileDto profileDto) {
        List<Interest> interests = profileDto.getInterests().stream()
                .map(interestName -> new Interest(interestName, profileDto.getEmail())) // Create Interest objects
                .collect(Collectors.toList());

        // Initialize registeredEvents as an empty list if not present
        List<EventRegistration> registeredEvents = profileDto.getRegisteredEvents() != null ? 
            profileDto.getRegisteredEvents().stream()
                .map(EventRegistrationMapper::mapToEventRegistration) // Use your EventRegistration mapper
                .collect(Collectors.toList()) : new ArrayList<>();

        ProfileEntity profileEntity = new ProfileEntity();
        profileEntity.setId(profileDto.getId());
        profileEntity.setProfilePic(profileDto.getProfilePic());
        profileEntity.setName(profileDto.getName());
        profileEntity.setEmail(profileDto.getEmail());
        profileEntity.setYear(profileDto.getYear());
        profileEntity.setMajor(profileDto.getMajor());
        profileEntity.setInterests(interests);
        profileEntity.setRegisteredEvents(registeredEvents);
        return profileEntity;
    }

    public static ProfileDto mapToProfileDto(ProfileEntity profile) {
        ProfileDto profileDto = new ProfileDto();
        profileDto.setId(profile.getId());
        profileDto.setProfilePic(profile.getProfilePic());
        profileDto.setName(profile.getName());
        profileDto.setEmail(profile.getEmail());
        profileDto.setYear(profile.getYear());
        profileDto.setMajor(profile.getMajor());
        profileDto.setInterests(profile.getInterests().stream().map(Interest::getInterest).collect(Collectors.toList()));
        
        // Ensure proper mapping for registered events
        profileDto.setRegisteredEvents(profile.getRegisteredEvents().stream()
            .map(EventRegistrationDto::new)
            .collect(Collectors.toList()));

        return profileDto;
    }
}
