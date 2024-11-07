package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "event_registrations")
public class EventRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference  // Prevents infinite recursion for event field
    @JoinColumn(name = "event_id", nullable = false)
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;  // The user will contain name and email, no need to duplicate

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private ProfileEntity profile;  // Optional, depending on your design
}
