package com.example.demo.service;

import com.example.demo.dto.ProfileDto;
import java.util.List;

public interface ProfileService {
    ProfileDto createProfile(ProfileDto profileDto);

    ProfileDto getProfileById(Long profileId);
    ProfileDto getProfileByEmail(String email); 

    List<ProfileDto> getAllProfiles();

    ProfileDto updateProfile(Long profileId, ProfileDto updatedProfile);

    void deleteProfile(Long profileId);
}
