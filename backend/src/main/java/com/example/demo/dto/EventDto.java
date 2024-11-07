package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class EventDto {
    private Long id;
    private String title;
    private String description;
    private String instruction;
    private String location;
    private LocalDate date;
    private LocalTime time;
    private String category;
    private String registrationLink;
    private int status;
    private String posterEmail; // Add posterEmail field
    private List<EventRegistrationDto> registrations;

    // Update constructor to include posterEmail
    public EventDto(Long id, String title, String description, String instruction, String location, LocalDate date,
                    LocalTime time, String category, String registrationLink, int status, 
                    String posterEmail, List<EventRegistrationDto> registrations) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instruction = instruction;
        this.location = location;
        this.date = date;
        this.time = time;
        this.category = category;
        this.registrationLink = registrationLink;
        this.status = status;
        this.posterEmail = posterEmail;
        this.registrations = registrations;
    }

    // Add getter and setter for posterEmail
    public String getPosterEmail() {
        return posterEmail;
    }

    public void setPosterEmail(String posterEmail) {
        this.posterEmail = posterEmail;
    }
    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getInstruction() {
        return instruction;
    }

    public String getLocation() {
        return location;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getTime() {
        return time;
    }

    public String getCategory() {
        return category;
    }

    public String getRegistrationLink() {
        return registrationLink;
    }

    public int getStatus() {
        return status;
    }

    public List<EventRegistrationDto> getRegistrations() {
        return registrations;
    }

    // Setters (if needed)
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setRegistrationLink(String registrationLink) {
        this.registrationLink = registrationLink;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setRegistrations(List<EventRegistrationDto> registrations) {
        this.registrations = registrations;
    }
}
