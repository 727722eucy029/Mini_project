package com.example.demo.mapper;

import com.example.demo.dto.EventRegistrationDto;
import com.example.demo.entity.EventEntity;
import com.example.demo.entity.EventRegistration;
import com.example.demo.entity.UserEntity;

public class EventRegistrationMapper {

    public static EventRegistrationDto mapToEventRegistrationDto(EventRegistration eventRegistration) {
    	return new EventRegistrationDto(
                eventRegistration.getId(),
                eventRegistration.getEvent().getId(),
                eventRegistration.getUser().getId(),
                eventRegistration.getUser().getUserName(),  // Accessing name from the associated UserEntity
                eventRegistration.getUser().getEmail()  // Ensure email comes from UserEntity
        );
    }

    public static EventRegistration mapToEventRegistration(EventRegistrationDto eventRegistrationDto) {
        EventRegistration eventRegistration = new EventRegistration();
        eventRegistration.setId(eventRegistrationDto.getId());
        // You may need to set other properties if necessary, depending on your requirements.
//        eventRegistration.setName(eventRegistrationDto.getName());
//        eventRegistration.setEmail(eventRegistrationDto.getEmail());

        return eventRegistration;
    }
}
