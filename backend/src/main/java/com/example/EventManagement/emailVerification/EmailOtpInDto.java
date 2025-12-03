package com.example.EventManagement.emailVerification;

import lombok.Data;

@Data
public class EmailOtpInDto {
    private String userid;

    private String email;

    private String otp;
}
