package com.example.demo.mapper;

import com.example.demo.dto.ProfileDto;
import com.example.demo.entity.ProfileEntity;

public class ProfileMapper {

    // Mapping from ProfileDto to ProfileEntity
    public static ProfileEntity mapToProfile(ProfileDto profileDto) {
        return new ProfileEntity(
                profileDto.getId(),
                profileDto.getProfilePic(),
                profileDto.getName(),
                profileDto.getEmail(),
                profileDto.getYear(),
                profileDto.getMajor(),
                profileDto.getInterests()
        );
    }

    // Mapping from ProfileEntity to ProfileDto
    public static ProfileDto mapToProfileDto(ProfileEntity profileEntity) {
        return new ProfileDto(
                profileEntity.getId(),
                profileEntity.getProfilePic(),
                profileEntity.getName(),
                profileEntity.getEmail(),
                profileEntity.getYear(),
                profileEntity.getMajor(),
                profileEntity.getInterests()
            
        );
    }
}
