package com.example.demo.service;

import com.example.demo.dto.EventDto;
import com.example.demo.entity.EventEntity;

import java.util.List;

public interface EventService {
    EventDto createEvent(EventDto eventDto);

    EventEntity getEventById(Long eventId);
    

    List<EventDto> getAllEvents();

    EventDto updateEvent(Long eventId, EventDto updatedEvent);

    void deleteEvent(Long eventId);
}
