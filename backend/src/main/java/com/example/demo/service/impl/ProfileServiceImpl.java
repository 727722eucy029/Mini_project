package com.example.demo.service.impl;

import com.example.demo.dto.ProfileDto;
import java.util.Optional;
import com.example.demo.entity.ProfileEntity;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.ProfileMapper;
import com.example.demo.repository.ProfileRepository;
import com.example.demo.service.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    @Override
    public ProfileDto createProfile(ProfileDto profileDto) {
        ProfileEntity profile = ProfileMapper.mapToProfile(profileDto);
        ProfileEntity savedProfile = profileRepository.save(profile);
        return ProfileMapper.mapToProfileDto(savedProfile);
    }

    public ProfileDto getProfileByEmail(String email) {
        System.out.println("Received email: " + email); // Debugging line
        return profileRepository.findByEmail(email)
            .map(ProfileMapper::mapToProfileDto)
            .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
    @Override
    public ProfileDto getProfileById(Long profileId) {
        ProfileEntity profile = profileRepository.findById(profileId).orElseThrow(
                () -> new ResourceNotFoundException("Profile does not exist with given id: " + profileId)
        );
        return ProfileMapper.mapToProfileDto(profile);
    }

    @Override
    public List<ProfileDto> getAllProfiles() {
        List<ProfileEntity> profiles = profileRepository.findAll();
        return profiles.stream().map(ProfileMapper::mapToProfileDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProfileDto updateProfile(Long profileId, ProfileDto updatedProfile) {
        ProfileEntity profile = profileRepository.findById(profileId).orElseThrow(
                () -> new ResourceNotFoundException("Profile does not exist with given id: " + profileId)
        );

        profile.setProfilePic(updatedProfile.getProfilePic());
        profile.setName(updatedProfile.getName());
        profile.setEmail(updatedProfile.getEmail());
        profile.setYear(updatedProfile.getYear());
        profile.setMajor(updatedProfile.getMajor());
        profile.setInterests(updatedProfile.getInterests());
        

        ProfileEntity savedProfile = profileRepository.save(profile);
        return ProfileMapper.mapToProfileDto(savedProfile);
    }

    @Override
    public void deleteProfile(Long profileId) {
        profileRepository.findById(profileId).orElseThrow(
                () -> new ResourceNotFoundException("Profile does not exist with given id: " + profileId)
        );
        profileRepository.deleteById(profileId);
    }
}
