package com.example.GreenRoute.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupRequestDTO {
    private String username;
    private String password;
}

