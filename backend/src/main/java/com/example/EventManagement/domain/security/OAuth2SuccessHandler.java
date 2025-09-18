package com.example.EventManagement.domain.security;

import com.example.EventManagement.domain.dto.LoginResponceDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final AuthService authService;
    private final ObjectMapper objectMapper;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken token= (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User= (OAuth2User) authentication.getPrincipal();
        String registrationId= token.getAuthorizedClientRegistrationId();

        ResponseEntity<LoginResponceDTO> loginResponceDTO= authService.handleOAuth2LoginRequest(oAuth2User,registrationId);

        response.setStatus(loginResponceDTO.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(loginResponceDTO.getBody()));
//        response.sendRedirect("http://localhost:3000/dashboard");


        String jwtToken = loginResponceDTO.getBody().getJwt();
        // Make sure your DTO has a getToken() method

        String name = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");

        String redirectUrl = UriComponentsBuilder
                .fromUriString("http://localhost:3000/oauth2/success")
                .queryParam("token", jwtToken) // now using actual token
                .queryParam("name", name)
                .queryParam("email", email)
                .build()
                .toUriString();

        response.sendRedirect(redirectUrl);
    }
}
