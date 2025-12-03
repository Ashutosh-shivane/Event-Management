package com.example.EventManagement.emailVerification;

import com.example.EventManagement.domain.entity.User;
import com.example.EventManagement.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final EmailVerificationRepository emailVerificationRepository;

    private final UserRepository userRepository;

    private final EmailService emailService;


    public String generateOtp() {
        return String.format("%06d", new Random().nextInt(900000) + 100000);
    }


    public String createAndSentOtp(EmailVerificationIndto emailVerificationIndto) {

        String userid=emailVerificationIndto.getUserid();
        String email=emailVerificationIndto.getEmail();

        User user=userRepository.findById(Long.parseLong(userid)).orElse(null);

        if(user==null){
            return "not sent Email";
        }

        String otp=generateOtp();

        EmailVerification emailVerification=new EmailVerification();

        emailVerification.setUserid(Long.toString(user.getId()));
        emailVerification.setEmail(user.getUsername());
        emailVerification.setOtp(otp);
        emailVerification.setActive(true);

        emailVerificationRepository.updateisActive(Long.toString(user.getId()));

        emailVerificationRepository.save(emailVerification);

        emailService.sendOtpEmail(user.getUsername(),otp,user.getName());
        return "Sent";
    }

    public String createAndReSentOtp(EmailVerificationIndto emailVerificationIndto) {

        String userid=emailVerificationIndto.getUserid();
        String email=emailVerificationIndto.getEmail();

        User user=userRepository.findById(Long.parseLong(userid)).orElse(null);

        if(user==null){
            return "not sent Email";
        }

        String otp=generateOtp();

        EmailVerification emailVerification=new EmailVerification();

        emailVerification.setUserid(Long.toString(user.getId()));
        emailVerification.setEmail(user.getUsername());
        emailVerification.setOtp(otp);
        emailVerification.setActive(true);

        emailVerificationRepository.updateisActive(Long.toString(user.getId()));

        emailVerificationRepository.save(emailVerification);
        emailService.sendOtpEmail(user.getUsername(),otp,user.getName());
        return "Resent";
    }

    public String verifyEmailOtp(EmailOtpInDto emailOtpInDto) {

        String userid=emailOtpInDto.getUserid();
        String email=emailOtpInDto.getEmail();
        String otp=emailOtpInDto.getOtp();

        User user=userRepository.findById(Long.parseLong(userid)).orElse(null);

        if(user==null){
            return "User not found";
        }

        EmailVerification emailVerification = emailVerificationRepository.findByUseridAndIsActive( Long.toString( user.getId()), true)
                .orElse(null);
        if(emailVerification==null){
            return "OTP not found";
        }

        String db_otp=emailVerification.getOtp();

        if(db_otp.equals(otp)){
            user.setVerified(true);
            userRepository.save(user);
            return "Verified Successfully";
        }else{
            return "Otp does not match";
        }








    }
}
