package com.example.demo.mapper;

import com.example.demo.dto.EventDto;
import com.example.demo.entity.EventEntity;

public class EventMapper {

    public static EventDto mapToEventDto(EventEntity event) {
        return new EventDto(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getInstruction(),
                event.getLocation(),
                event.getDate(),
                event.getTime(),
                event.getCategory(),
                event.getRegistrationLink(),
                event.getStatus()
        );
    }

    public static EventEntity mapToEvent(EventDto eventDto) {
        return new EventEntity(
                eventDto.getId(),
                eventDto.getTitle(),
                eventDto.getDescription(),
                eventDto.getInstruction(),
               eventDto.getLocation(),
               eventDto.getDate(),
                eventDto.getTime(),
                eventDto.getCategory(),
                eventDto.getRegistrationLink(),
                eventDto.getStatus()
        );
    }
}
