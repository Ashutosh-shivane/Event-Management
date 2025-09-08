package com.example.GreenRoute.domain.dto;

import com.example.GreenRoute.domain.entity.type.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class SignupRequestDTO {
    private String username;
    private String password;
    private String name;
    private UserType usertype;
}

