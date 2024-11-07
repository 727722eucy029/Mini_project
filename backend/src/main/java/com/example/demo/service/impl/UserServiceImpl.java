package com.example.demo.service.impl;

import com.example.demo.dto.EventRegistrationDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.OtpEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.entity.EventRegistration;
import com.example.demo.repository.OtpRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final OtpRepository otpRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    private static final int OTP_EXPIRATION_TIME = 5;

    @Override
    public UserDto createUser(UserDto userDto) {
        UserEntity user = new UserEntity();
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPass(userDto.getPass()); // Ensure to hash passwords for security
        user.setRole(userDto.getRole());

        user = userRepository.save(user);
        return new UserDto(user.getId(), user.getUserName(), user.getPass(), user.getEmail(), user.getRole(), List.of());
    }

    @Override
    public UserEntity getUserByEmail(String email) {
        logger.info("Fetching user with email: {}", email);
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();

        return users.stream().map(user -> {
            List<EventRegistrationDto> registeredEvents = user.getRegisteredEvents().stream()
                    .map(EventRegistrationDto::new) // Using the constructor from EventRegistrationDto
                    .collect(Collectors.toList());

            return new UserDto(user.getId(), user.getUserName(), user.getPass(), user.getEmail(), user.getRole(), registeredEvents);
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User not found");
        }
        userRepository.deleteById(userId);
    }

    @Override
    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpirationTime(LocalDateTime.now().plusMinutes(OTP_EXPIRATION_TIME));
        otpRepository.save(otpEntity);
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
        OtpEntity otpEntity = otpRepository.findByEmailAndOtp(email, otp)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or OTP"));
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

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {
        // TODO Auto-generated method stub
        return null;
    }
}
