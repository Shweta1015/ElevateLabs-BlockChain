package com.example.blockchain.service;

import com.example.blockchain.Repository.UserRepository;
import com.example.blockchain.Security.JwtUtil;
import com.example.blockchain.dto.JwtResponse;
import com.example.blockchain.dto.LoginRequest;
import com.example.blockchain.dto.SignupRequest;
import com.example.blockchain.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtil jwtUtil;

    public void registerUser (SignupRequest request){
        if (userRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("Email already in use");
        }
        String encoded = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getName(), request.getEmail(), encoded, request.getContactNo());
        userRepository.save(user);
    }

    public JwtResponse authenticate(LoginRequest req){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        // if authentication successful
        String token = jwtUtil.generateToken(req.getEmail());
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(()-> new RuntimeException("User not found after authentication"));

        System.out.println("User found: "+user.getEmail()+", Name: "+user.getName());

        JwtResponse response = new JwtResponse(token, user.getEmail(), user.getName());
        System.out.println("Sending response: token=" +token+" email="+user.getName()+", name="+ user.getName());

        return response;
    }
}
