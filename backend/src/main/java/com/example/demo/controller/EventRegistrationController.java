package com.example.demo.controller;

import com.example.demo.dto.EventRegistrationDto;
import com.example.demo.dto.ProfileDto;
import com.example.demo.entity.EventRegistration;
import com.example.demo.service.EventRegistrationService;
import com.example.demo.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")

@RestController
@RequestMapping("/api/event-registrations")
public class EventRegistrationController {

    @Autowired
    private EventRegistrationService eventRegistrationService;

    @Autowired
    private ProfileService profileService;

    // Register a user for an event
    @PostMapping("/register/{eventId}/{userEmail}") // Use userEmail as a path variable
    public ResponseEntity<EventRegistrationDto> registerUserForEvent(
            @PathVariable Long eventId,
            @PathVariable String userEmail, // Use userEmail instead of userId
            @RequestBody EventRegistrationDto registrationDto) {

        ProfileDto profile = profileService.getProfileByEmail(userEmail); // Get profile by email
        if (profile == null) {
            return ResponseEntity.badRequest().body(null); // Handle it as required
        }

        // Pass userEmail (String) as expected by the service method
        EventRegistrationDto createdRegistration = eventRegistrationService.registerUserForEvent(eventId, userEmail, registrationDto);
        return ResponseEntity.status(201).body(createdRegistration);
    }


    // Get all event registrations
    @GetMapping
    public ResponseEntity<List<EventRegistrationDto>> getAllRegistrations() {
        List<EventRegistrationDto> registrations = eventRegistrationService.getAllRegistrations();
        return ResponseEntity.ok(registrations);
    }

    // Get an event registration by ID
    @GetMapping("/{registrationId}")
    public ResponseEntity<EventRegistrationDto> getRegistrationById(@PathVariable Long registrationId) {
        EventRegistrationDto registration = eventRegistrationService.getRegistrationById(registrationId);
        return ResponseEntity.ok(registration);
    }
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<EventRegistrationDto>> getRegistrationsForEvent(@PathVariable Long eventId) {
        List<EventRegistrationDto> registrations = eventRegistrationService.getRegistrationsByEventId(eventId);
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    // Delete an event registration
    @DeleteMapping("/{registrationId}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable Long registrationId) {
        eventRegistrationService.deleteRegistration(registrationId);
        return ResponseEntity.noContent().build();
    }
}
