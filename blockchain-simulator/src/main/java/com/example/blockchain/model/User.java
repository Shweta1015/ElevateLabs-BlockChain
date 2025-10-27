package com.example.blockchain.model;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String name;
    private String email;
    private String password; // stored as BCrypt hash
    private String contactNo;
    private String role = "USER"; // simple role (can expand)

    public User() {}

    public User(String name, String email, String password, String contactNo) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNo = contactNo;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getContactNo() { return contactNo; }
    public void setContactNo(String contactNo) { this.contactNo = contactNo; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
