package com.example.demo.controller;

import lombok.AllArgsConstructor;
import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId) {
        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email") String email) {
        UserDto userDto = userService.getUserByEmail(email);
        return ResponseEntity.ok(userDto);
    }
    @GetMapping("/current")
    public ResponseEntity<UserDto> getCurrentUser() {
        UserDto currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(currentUser);
    }


    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userId,
                                              @RequestBody UserDto updatedUser) {
        UserDto userDto = userService.updateUser(userId, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully!");
    }

    // Endpoint to generate OTP
    @PostMapping("/generate-otp")
    public ResponseEntity<String> generateOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String response = userService.generateOtp(email);
        return ResponseEntity.ok(response);
    }

    // Endpoint to validate OTP
    @PostMapping("/validate-otp")
    public ResponseEntity<Boolean> validateOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        boolean isValid = userService.validateOtp(email, otp);
        return ResponseEntity.ok(isValid);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}