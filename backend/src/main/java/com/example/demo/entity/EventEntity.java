package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "instruction")
    private String instruction;
    
    @Column(name = "location")
    private String location;


    @Column(name = "date")
    private LocalDate date;  // Change to LocalDate

    @Column(name = "time")
    private LocalTime time;  // Change to LocalTime

    @Column(name = "category")
    private String category;
    
    @Column(name = "registrationLink")
    private String registrationLink;

    @Column(name = "status")
    private int status;
}
