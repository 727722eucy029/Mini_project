package com.example.demo.mapper;

import com.example.demo.dto.EventDto;
import com.example.demo.entity.EventEntity;
import java.util.stream.Collectors;

public class EventMapper {

	 public static EventEntity mapToEvent(EventDto eventDto) {
	        EventEntity eventEntity = new EventEntity();
	        eventEntity.setId(eventDto.getId());
	        eventEntity.setTitle(eventDto.getTitle());
	        eventEntity.setDescription(eventDto.getDescription());
	        eventEntity.setInstruction(eventDto.getInstruction());
	        eventEntity.setLocation(eventDto.getLocation());
	        eventEntity.setDate(eventDto.getDate());
	        eventEntity.setTime(eventDto.getTime());
	        eventEntity.setCategory(eventDto.getCategory());
	        eventEntity.setRegistrationLink(eventDto.getRegistrationLink());
	        eventEntity.setStatus(eventDto.getStatus());
	        eventEntity.setPosterEmail(eventDto.getPosterEmail()); // Map posterEmail

	        if (eventDto.getRegistrations() != null) {
	            eventEntity.setRegistrations(
	                eventDto.getRegistrations().stream()
	                    .map(EventRegistrationMapper::mapToEventRegistration) // Assuming this method exists
	                    .collect(Collectors.toList())
	            );
	        }

	        return eventEntity;
	    }

	    public static EventDto mapToEventDto(EventEntity eventEntity) {
	        return new EventDto(
	            eventEntity.getId(),
	            eventEntity.getTitle(),
	            eventEntity.getDescription(),
	            eventEntity.getInstruction(),
	            eventEntity.getLocation(),
	            eventEntity.getDate(),
	            eventEntity.getTime(),
	            eventEntity.getCategory(),
	            eventEntity.getRegistrationLink(),
	            eventEntity.getStatus(),
	            eventEntity.getPosterEmail(), // Map posterEmail
	            eventEntity.getRegistrations() != null ? 
	                eventEntity.getRegistrations().stream()
	                    .map(EventRegistrationMapper::mapToEventRegistrationDto) // Assuming this method exists
	                    .collect(Collectors.toList()) : null
	        );
	    }
	}