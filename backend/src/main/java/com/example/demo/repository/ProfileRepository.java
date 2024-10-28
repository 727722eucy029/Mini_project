package com.example.demo.repository;

import com.example.demo.entity.ProfileEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {
	Optional<ProfileEntity> findByEmail(String email);
}
