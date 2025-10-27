package com.example.blockchain.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long jwtExpirationMs;

    /**
     * Constructor expects jwt.secret (preferably Base64-encoded) and jwt.expiration-ms in application.properties.
     * If jwt.secret is plain text, the fallback will use UTF-8 bytes (ensure it's >= 32 bytes for HS256).
     */
    public JwtUtil(@Value("${jwt.secret}") String base64Secret,
                   @Value("${jwt.expiration-ms}") long jwtExpirationMs) {
        byte[] keyBytes;
        try {
            // try to decode as Base64 first (recommended)
            keyBytes = Decoders.BASE64.decode(base64Secret);
        } catch (Exception e) {
            // fallback to plain-text bytes (use only for testing; prefer base64)
            keyBytes = base64Secret.getBytes(StandardCharsets.UTF_8);
        }
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.jwtExpirationMs = jwtExpirationMs;
    }

    /**
     * Generate a signed JWT token with the provided subject (usually user's email or username).
     */
    public String generateToken(String subject) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract subject (email) from a signed JWT.
     */
    public String getEmailFromJwt(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)   // parseClaimsJws for signed JWS tokens
                .getBody();
        return claims.getSubject();
    }

    /**
     * Validate token signature and expiration.
     */
    public boolean validateJwt(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException ex) { // includes expired, malformed, signature invalid, etc.
            return false;
        }
    }
}
