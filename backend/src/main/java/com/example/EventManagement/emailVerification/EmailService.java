package com.example.EventManagement.emailVerification;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.file.Files;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp,String username) {
        try {
            ClassPathResource htmlFile = new ClassPathResource("templates/verification-email.html");
            String htmlContent = new String(Files.readAllBytes(htmlFile.getFile().toPath()));

            // 2. Replace placeholders with real values
            htmlContent = htmlContent.replace("{{username}}", username);
            htmlContent = htmlContent.replace("{{otp}}", otp);

            // 3. Prepare email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Your Email Verification OTP");
            helper.setText(htmlContent, true); // true → enable HTML

            // 4. Send email
            mailSender.send(message);
            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email");
        }
    }
}
