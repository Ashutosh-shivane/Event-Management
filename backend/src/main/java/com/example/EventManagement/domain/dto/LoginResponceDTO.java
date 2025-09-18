package com.example.EventManagement.domain.dto;

import com.example.EventManagement.domain.entity.type.UserType;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginResponceDTO {
    String jwt;
    Long userid;
    String name;
    String username;
    UserType role;
    String profileCompleted;

}
