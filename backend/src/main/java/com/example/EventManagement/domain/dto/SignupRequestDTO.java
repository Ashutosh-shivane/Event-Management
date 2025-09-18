package com.example.EventManagement.domain.dto;

import com.example.EventManagement.domain.entity.type.UserType;
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

