package com.example.demo.repository;

import com.example.demo.entity.EventEntity; // Updated to EventEntity
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<EventEntity, Long> { // Updated to EventEntity
}
