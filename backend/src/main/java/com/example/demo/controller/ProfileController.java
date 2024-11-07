package com.example.demo.controller;

import com.example.demo.dto.ProfileDto;
import com.example.demo.service.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<ProfileDto> createProfile(@RequestBody ProfileDto profileDto) {
        ProfileDto profile = profileService.createProfile(profileDto);
        return new ResponseEntity<>(profile, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDto> getProfileById(@PathVariable("id") Long profileId) {
        ProfileDto profileDto = profileService.getProfileById(profileId);
        return ResponseEntity.ok(profileDto);
    }

    @GetMapping
    public ResponseEntity<List<ProfileDto>> getAllProfiles() {
        List<ProfileDto> profiles = profileService.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ProfileDto> getProfileByEmail(@PathVariable("email") String email) {
        ProfileDto profileDto = profileService.getProfileByEmail(email);
        return ResponseEntity.ok(profileDto);
    }

    @PutMapping("/{id}") // This is correct
    public ResponseEntity<ProfileDto> updateProfile(@PathVariable("id") Long profileId,
                                                    @RequestBody ProfileDto updatedProfile) {
        ProfileDto profileDto = profileService.updateProfile(profileId, updatedProfile);
        return ResponseEntity.ok(profileDto);
    }

    @PutMapping("/email/{email}")
    public ResponseEntity<ProfileDto> updateProfileByEmail(@PathVariable("email") String email,
                                                           @RequestBody ProfileDto updatedProfile) {
        ProfileDto profileDto = profileService.updateProfileByEmail(email, updatedProfile);
        return ResponseEntity.ok(profileDto);
    }

    // New endpoint to update interests based on email
    @PutMapping("/email/{email}/interests")
    public ResponseEntity<ProfileDto> updateInterestsByEmail(@PathVariable("email") String email,
                                                               @RequestBody List<String> interests) {
        ProfileDto profileDto = profileService.updateInterestsByEmail(email, interests);
        return ResponseEntity.ok(profileDto);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable("id") Long profileId) {
        profileService.deleteProfile(profileId);
        return ResponseEntity.ok("Profile deleted successfully!");
    }
}
