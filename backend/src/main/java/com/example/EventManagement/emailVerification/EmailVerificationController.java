package com.example.EventManagement.emailVerification;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("EmailVerification")
@RequiredArgsConstructor
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;




    @PostMapping("/SentEmail")
    private ResponseEntity<String> createAndSentOtp(@RequestBody EmailVerificationIndto emailVerificationIndto ){

        return ResponseEntity.ok(emailVerificationService.createAndSentOtp(emailVerificationIndto));

    }


    @PostMapping("/ReSentEmail")
    private ResponseEntity<String> createAndReSentOtp(@RequestBody EmailVerificationIndto emailVerificationIndto ){

        return ResponseEntity.ok(emailVerificationService.createAndReSentOtp(emailVerificationIndto));

    }


    @PostMapping("/VerifyEmailOtp")
    private ResponseEntity<String> verifyEmailOtp(@RequestBody EmailOtpInDto emailOtpInDto  ){

        return ResponseEntity.ok(emailVerificationService.verifyEmailOtp(emailOtpInDto));

    }



}
