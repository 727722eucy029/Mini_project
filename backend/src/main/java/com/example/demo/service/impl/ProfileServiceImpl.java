package com.example.demo.service.impl;

import com.example.demo.dto.ProfileDto;
import com.example.demo.entity.Interest;
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

    @Override
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

        List<Interest> interests = updatedProfile.getInterests().stream()
                .map(interest -> new Interest(interest, profile.getEmail()))  // Set email for each interest
                .collect(Collectors.toList());
        profile.setInterests(interests);

        ProfileEntity savedProfile = profileRepository.save(profile);
        return ProfileMapper.mapToProfileDto(savedProfile);
    }

    @Override
    public ProfileDto updateInterestsByEmail(String email, List<String> interests) {
    	 System.out.println("Updating interests for email: " + email);
    	    System.out.println("New interests: " + interests);
        ProfileEntity profile = profileRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Profile does not exist with given email: " + email)
        );

        // Clear existing interests if needed
        profile.getInterests().clear();

        // Create new Interest objects and set their fields
        List<Interest> updatedInterests = interests.stream()
                .map(interest -> {
                    Interest newInterest = new Interest();
                    newInterest.setEmail(profile.getEmail()); // Set the profile's email
                    newInterest.setInterest(interest); // Set the interest
                    return newInterest; // Return the newly created Interest object
                })
                .collect(Collectors.toList());

        // Set the updated interests in the profile
        profile.setInterests(updatedInterests);
        
        // Save the profile with updated interests
        ProfileEntity savedProfile = profileRepository.save(profile);
        
        return ProfileMapper.mapToProfileDto(savedProfile);
    }

    @Override
    public ProfileDto updateProfileByEmail(String email, ProfileDto updatedProfile) {
        ProfileEntity profile = profileRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Profile does not exist with given email: " + email)
        );

        profile.setProfilePic(updatedProfile.getProfilePic());
        profile.setName(updatedProfile.getName());
        profile.setYear(updatedProfile.getYear());
        profile.setMajor(updatedProfile.getMajor());

        // Convert List<String> to List<Interest> with email
        List<Interest> interests = updatedProfile.getInterests().stream()
                .map(interest -> new Interest(interest, profile.getEmail())) // Set email for each interest
                .collect(Collectors.toList());
        profile.setInterests(interests);

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
