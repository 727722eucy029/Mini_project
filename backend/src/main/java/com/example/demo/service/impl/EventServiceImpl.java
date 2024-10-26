package com.example.demo.service.impl;

import com.example.demo.dto.EventDto;
import com.example.demo.entity.EventEntity; // Updated to EventEntity
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.EventMapper;
import com.example.demo.repository.EventRepository;
import com.example.demo.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public EventDto createEvent(EventDto eventDto) {
        EventEntity event = EventMapper.mapToEvent(eventDto); // Updated to EventEntity
        EventEntity savedEvent = eventRepository.save(event); // Updated to EventEntity
        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public EventDto getEventById(Long eventId) {
        EventEntity event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("Event does not exist with a given id: " + eventId)
        );
        return EventMapper.mapToEventDto(event);
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<EventEntity> events = eventRepository.findAll(); // Updated to EventEntity
        return events.stream().map(EventMapper::mapToEventDto)
                .collect(Collectors.toList());
    }

    @Override
    public EventDto updateEvent(Long eventId, EventDto updatedEvent) {
        EventEntity event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("Event does not exist with a given id: " + eventId)
        );

        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setInstruction(updatedEvent.getInstruction());
        event.setLocation(updatedEvent.getLocation());
        event.setDate(updatedEvent.getDate());
        event.setCategory(updatedEvent.getCategory());
        event.setRegistrationLink(updatedEvent.getRegistrationLink());
        event.setStatus(updatedEvent.getStatus());

        EventEntity savedEvent = eventRepository.save(event);

        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public void deleteEvent(Long eventId) {
        eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("Event does not exist with a given id: " + eventId)
        );
        eventRepository.deleteById(eventId);
    }
}
