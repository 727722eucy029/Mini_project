package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.example.demo.entity.ProfileEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
	private Long id;
    private String profilePic; // Note: Change to 'profile_pic' if using snake_case in DB
    private String name;
    private String email;
    private String year;
    private String major;
    private List<String> interests; // Ensure this is populated correctly in service

    // New constructor to create ProfileDto from ProfileEntity
    public ProfileDto(ProfileEntity profile) {
        this.id = profile.getId(); // Assuming you have an getId() method in ProfileEntity
        this.profilePic = profile.getProfilePic();
        this.name = profile.getName();
        this.email = profile.getEmail();
        this.year = profile.getYear();
        this.major = profile.getMajor();
        this.interests = profile.getInterests();
       
    }
}
