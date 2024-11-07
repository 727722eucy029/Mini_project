package com.example.demo.dto;

import com.example.demo.entity.EventRegistration;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EventRegistrationDto {
    private Long id;
    private Long eventId;
    private Long userId;
    private String name;
    private String email; // Email should be distinct from id

    // New constructor for creating DTO from event details
    public EventRegistrationDto(Long eventId, String name, String email) {
        this.eventId = eventId;
        this.name = name;
        this.email = email;
    }

    // Constructor to create EventRegistrationDto from EventRegistration entity
    public EventRegistrationDto(EventRegistration eventRegistration) {
        this.id = eventRegistration.getId();
        this.eventId = eventRegistration.getEvent().getId(); // Ensure getEvent() is not null
        this.userId = eventRegistration.getUser().getId(); // Ensure getUser() is not null
//        this.name = eventRegistration.getName();
//        this.email = eventRegistration.getEmail();
    }
}
