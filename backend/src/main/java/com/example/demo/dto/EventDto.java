package com.example.demo.dto;

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
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private String instruction;
    private String location;
    private LocalDate date;  // Change to LocalDate
    private LocalTime time;  // Change to LocalTime
    private String category;
    private String registrationLink;
    private int status;
}
