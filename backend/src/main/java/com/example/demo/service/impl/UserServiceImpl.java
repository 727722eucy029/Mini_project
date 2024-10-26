package com.example.demo.service.impl;

import com.example.demo.dto.UserDto; // Import UserDto
import com.example.demo.entity.OtpEntity; // Import OtpEntity
import com.example.demo.entity.UserEntity; // Import User entity
import com.example.demo.repository.OtpRepository; // Import OtpRepository
import com.example.demo.repository.UserRepository; // Import UserRepository
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired; // Import Autowired
import org.springframework.mail.javamail.JavaMailSender; // Import JavaMailSender
import org.springframework.mail.SimpleMailMessage; // Import SimpleMailMessage
import org.springframework.stereotype.Service; // Import Service
import lombok.AllArgsConstructor; // Import AllArgsConstructor

import java.time.LocalDateTime; // Import LocalDateTime
import java.util.List; // Import List
import java.util.Optional; // Import Optional
import java.util.Random; // Import Random
import java.util.stream.Collectors; // Import Collectors

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final OtpRepository otpRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    // OTP expiration time in minutes
    private static final int OTP_EXPIRATION_TIME = 5;

    @Override
    public UserDto createUser(UserDto userDto) {
        // Logic for creating a user
        UserEntity user = new UserEntity(); // Assuming User is your entity class
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPass(userDto.getPass()); // Ensure to hash passwords for security
        user.setRole(userDto.getRole());

        // Save the user to the database
        user = userRepository.save(user);

        // Return UserDto
        return new UserDto(user.getId(), user.getUserName(), user.getPass(), user.getEmail(), user.getRole());
    }

    @Override
    public UserDto getUserById(Long userId) {
        // Logic to fetch user by ID
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return new UserDto(user.getId(), user.getUserName(), user.getPass(), user.getEmail(), user.getRole());
    }

    @Override
    public UserDto getUserByEmail(String email) {
        // Logic to fetch user by email
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return new UserDto(user.getId(), user.getUserName(), user.getPass(), user.getEmail(), user.getRole());
    }


    @Override
    public List<UserDto> getAllUsers() {
        // Logic to fetch all users
        List<UserEntity> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDto(user.getId(), user.getUserName(), user.getPass(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {
        // Logic for updating a user
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        user.setUserName(updatedUser.getUserName());
        user.setPass(updatedUser.getPass()); // Ensure to hash passwords for security
        user.setEmail(updatedUser.getEmail());
        user.setRole(updatedUser.getRole());

        userRepository.save(user);
        return updatedUser; // Return the updated UserDto
    }

    @Override
    public void deleteUser(Long userId) {
        // Logic for deleting a user
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User not found");
        }
        userRepository.deleteById(userId);
    }

    @Override
    public String generateOtp(String email) {
        // Generate a 6-digit OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        // Create and save the OTP entity
        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpirationTime(LocalDateTime.now().plusMinutes(OTP_EXPIRATION_TIME));


        otpRepository.save(otpEntity);

        // Send the OTP via email
        sendOtpEmail(email, otp);

        return "OTP has been sent to your email.";
    }

    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);
        javaMailSender.send(message);
    }

    @Override
    public boolean validateOtp(String email, String otp) {
        // Fetch OTP entity by email and OTP
        OtpEntity otpEntity = otpRepository.findByEmailAndOtp(email, otp)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or OTP"));

        // Check if OTP has expired
        if (otpEntity.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("OTP has expired");
        }

        return true; // OTP is valid
    }

	@Override
	public UserDto getCurrentUser() {
		// TODO Auto-generated method stub
		return null;
	}

}
