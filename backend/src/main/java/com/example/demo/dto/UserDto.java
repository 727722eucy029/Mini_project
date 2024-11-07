// UserDto.java
package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String userName;
    private String pass;
    private String email;
    private String role;
    private List<EventRegistrationDto> registeredEvents; // New field for registered events
}
