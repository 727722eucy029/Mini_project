package com.example.demo.service;

import com.example.demo.dto.UserDto;
import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(Long userId);
    UserDto getUserByEmail(String email);
    UserDto getCurrentUser(); 
    List<UserDto> getAllUsers();

    UserDto updateUser(Long userId, UserDto updatedUser);

    void deleteUser(Long userId);

    // New methods for OTP generation and validation
    String generateOtp(String email);

    boolean validateOtp(String email, String otp);
}