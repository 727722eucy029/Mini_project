package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.entity.ProfileEntity;
import com.example.demo.entity.Interest;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private Long id;
    private String profilePic; // Note: Change to 'profile_pic' if using snake_case in DB
    private String name;
    private String email;
    private String year;
    private String major;
    private List<String> interests; // Now stores only interest names as strings
    private List<EventRegistrationDto> registeredEvents; // New field for registered events

    // Constructor to create ProfileDto from ProfileEntity
    public ProfileDto(ProfileEntity profile) {
        this.id = profile.getId();
        this.profilePic = profile.getProfilePic();
        this.name = profile.getName();
        this.email = profile.getEmail();
        this.year = profile.getYear();
        this.major = profile.getMajor();

        // Convert List<Interest> to List<String> by extracting the 'interest' field
        this.interests = profile.getInterests().stream()
            .map(Interest::getInterest) // Extracts only the interest name as a string
            .collect(Collectors.toList());

        // Map registered events from ProfileEntity if applicable
        this.registeredEvents = profile.getRegisteredEvents().stream()
            .map(EventRegistrationDto::new) // Make sure EventRegistrationDto has the correct constructor
            .collect(Collectors.toList());
    }
}
