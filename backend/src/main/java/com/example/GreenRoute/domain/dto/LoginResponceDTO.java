package com.example.GreenRoute.domain.dto;

import com.example.GreenRoute.domain.entity.type.UserType;
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
