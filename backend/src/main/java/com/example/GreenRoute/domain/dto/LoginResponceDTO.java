package com.example.GreenRoute.domain.dto;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginResponceDTO {
    String jwt;
    Long userid;
}
