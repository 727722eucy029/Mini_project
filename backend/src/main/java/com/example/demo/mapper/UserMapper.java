package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.UserEntity;

public class UserMapper {

    public static UserDto mapToUserDto(UserEntity user) {
        return new UserDto(
                user.getId(),
                user.getUserName(),
                user.getPass(),
                user.getEmail(),
                user.getRole()
        );
    }

    public static UserEntity mapToUser(UserDto userDto) {
        return new UserEntity(
                userDto.getId(),
                userDto.getUserName(),
                userDto.getPass(),
                userDto.getEmail(),
                userDto.getRole()
        );
    }
}
