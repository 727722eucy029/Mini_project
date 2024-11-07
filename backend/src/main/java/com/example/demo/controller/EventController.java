package com.example.demo.controller;

import com.example.demo.dto.EventDto;
import com.example.demo.entity.EventEntity;
import com.example.demo.mapper.EventMapper;
import com.example.demo.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/event")
public class EventController {

    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto){
        EventDto event = eventService.createEvent(eventDto);
        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable("id") Long eventId){
        // Adjusted to reflect the return type of the service method
        EventEntity eventEntity = eventService.getEventById(eventId);
        EventDto eventDto = EventMapper.mapToEventDto(eventEntity); // Convert to EventDto
        return ResponseEntity.ok(eventDto);
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents(){
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable("id") Long eventId,
                                                @RequestBody EventDto updatedEvent) {
        EventDto eventDto = eventService.updateEvent(eventId, updatedEvent);
        return ResponseEntity.ok(eventDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") Long eventId){
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok("Event deleted successfully!");
    }
}
