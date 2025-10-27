package com.example.blockchain.controller;

import com.example.blockchain.dto.JwtResponse;
import com.example.blockchain.dto.LoginRequest;
import com.example.blockchain.dto.SignupRequest;
import com.example.blockchain.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
public class AuthController {
    @Autowired private AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request){
        try {
            authService.registerUser(request);
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (IllegalArgumentException ex){
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        try {
            JwtResponse res = authService.authenticate(request);
            return ResponseEntity.ok(res);
        } catch (BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        JwtResponse testResponse = new JwtResponse("test-token", "test@email.com", "Test User");
        return ResponseEntity.ok(testResponse);
    }
}
