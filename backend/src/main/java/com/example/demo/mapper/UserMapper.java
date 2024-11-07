package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.UserEntity;

public class UserMapper {

    // Method to map UserEntity to UserDto
    public static UserDto mapToUserDto(UserEntity user) {
        return new UserDto(
                user.getId(),
                user.getUserName(),
                user.getPass(),
                user.getEmail(),
                user.getRole(),
                null // Optionally, you can map registered events here if you need
        );
    }

    // Method to map UserDto to UserEntity
    public static UserEntity mapToUser(UserDto userDto) {
        return new UserEntity(
                userDto.getId(),
                userDto.getUserName(),
                userDto.getPass(),
                userDto.getEmail(),
                userDto.getRole(),
                null // Initialize registeredEvents as null or an empty list if needed
        );
    }
}
