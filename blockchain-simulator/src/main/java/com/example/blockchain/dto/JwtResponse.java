package com.example.blockchain.dto;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String email;
    private String name;

    public JwtResponse(String token, String email, String name){
        this.token = token;
        this.email = email;
        this.name = name;
    }

    public String getToken() { return token; }
    public String getType() { return type; }
    public String getEmail() { return email; }
    public String getName() { return name; }
}
