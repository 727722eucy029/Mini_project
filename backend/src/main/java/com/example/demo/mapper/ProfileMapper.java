package com.example.demo.mapper;

import com.example.demo.dto.ProfileDto;
import com.example.demo.entity.ProfileEntity;
import com.example.demo.entity.Interest;

import java.util.List;
import java.util.stream.Collectors;

public class ProfileMapper {

    public static ProfileEntity mapToProfile(ProfileDto profileDto) {
        List<Interest> interests = profileDto.getInterests().stream()
                .map(interest -> new Interest(interest, profileDto.getEmail()))  // Set email here
                .collect(Collectors.toList());

        return new ProfileEntity(
                profileDto.getId(),
                profileDto.getProfilePic(),
                profileDto.getName(),
                profileDto.getEmail(),
                profileDto.getYear(),
                profileDto.getMajor(),
                interests
        );
    }

    public static ProfileDto mapToProfileDto(ProfileEntity profileEntity) {
        List<String> interests = profileEntity.getInterests().stream()
                .map(Interest::getInterest)
                .collect(Collectors.toList());

        return new ProfileDto(
                profileEntity.getId(),
                profileEntity.getProfilePic(),
                profileEntity.getName(),
                profileEntity.getEmail(),
                profileEntity.getYear(),
                profileEntity.getMajor(),
                interests
        );
    }
}
