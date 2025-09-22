package com.example.EventManagement.domain.controller;

import com.example.EventManagement.domain.dto.LoginRequestDTO;
import com.example.EventManagement.domain.dto.LoginResponceDTO;
import com.example.EventManagement.domain.dto.SignupRequestDTO;
import com.example.EventManagement.domain.dto.SignupResponceDTO;
import com.example.EventManagement.domain.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponceDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){
        return ResponseEntity.ok(authService.login(loginRequestDTO));

    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponceDTO> signup(@RequestBody SignupRequestDTO signupRequestDTO){
        return ResponseEntity.ok(authService.signup(signupRequestDTO));

    }
}
