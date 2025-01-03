package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "profiles")
public class ProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "profile_pic")
    private String profilePic;

    @Column(name = "name")
    private String name;

    @Column(name = "email", unique = true) // Making email unique to avoid duplication
    private String email;

    @Column(name = "year")
    private String year;

    @Column(name = "major")
    private String major;

    @ElementCollection
    @CollectionTable(name = "interests", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "interest")
    private List<Interest> interests;

    // Updated field for registered events
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventRegistration> registeredEvents;
}
