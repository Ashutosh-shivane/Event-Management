package com.example.GreenRoute.domain.security;

import com.example.GreenRoute.domain.dto.LoginRequestDTO;
import com.example.GreenRoute.domain.dto.LoginResponceDTO;
import com.example.GreenRoute.domain.dto.SignupRequestDTO;
import com.example.GreenRoute.domain.dto.SignupResponceDTO;
import com.example.GreenRoute.domain.entity.User;
import com.example.GreenRoute.domain.entity.type.AuthProviderType;
import com.example.GreenRoute.domain.entity.type.UserType;
import com.example.GreenRoute.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;

    private final AuthUtil authUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponceDTO login(LoginRequestDTO loginRequestDTO) {

        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(),loginRequestDTO.getPassword())
        );

        User user =(User) authentication.getPrincipal();

        String token =authUtil.generateAccessToken(user);

        return new LoginResponceDTO(token,user.getId(),user.getName(),user.getUsername(),user.getUsertype());


    }


    public User signUpInternal(SignupRequestDTO signupRequestDto, AuthProviderType authProviderType, String providerId) {
        User user = userRepository.findByUsername(signupRequestDto.getUsername()).orElse(null);

        if(user != null) throw new IllegalArgumentException("User already exists");

        System.out.println(signupRequestDto);

        user = User.builder()
                .username(signupRequestDto.getUsername())
                .providerId(providerId)
                .providerType(authProviderType)
                .name(signupRequestDto.getName())
                .usertype(signupRequestDto.getUsertype())
                .build();

        if(authProviderType == AuthProviderType.EMAIL) {
            user.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));
        }

        return userRepository.save(user);
    }


    public SignupResponceDTO signup(SignupRequestDTO signupRequestDTO) {

        User user =signUpInternal(signupRequestDTO,AuthProviderType.EMAIL,null);

        return new SignupResponceDTO(user.getId(),user.getUsername());


    }

    @Transactional
    public ResponseEntity<LoginResponceDTO> handleOAuth2LoginRequest(OAuth2User oAuth2User, String registrationId) {

        AuthProviderType authProviderType =authUtil.getProviderTypeFromRegistrationId(registrationId);
        String providerId=authUtil.determineProviderIdFromOAuth2User(oAuth2User,registrationId);

        User user=userRepository.findByProviderIdAndProviderType(providerId,authProviderType).orElse(null);
        String email=oAuth2User.getAttribute("email");

        User emailUser=userRepository.findByUsername(email).orElse(null);

        if(user ==null && emailUser==null){
            String username=authUtil.determineUsernameFromOAuth2User(oAuth2User,registrationId,providerId);
            user=signUpInternal(new SignupRequestDTO(username,null,username, UserType.STUDENT),authProviderType,providerId);
        } else if(user != null) {
        if(email != null && !email.isBlank() && !email.equals(user.getUsername())) {
            user.setUsername(email);
            userRepository.save(user);
        }
    } else {
        throw new BadCredentialsException("This email is already registered with provider "+emailUser.getProviderType());
    }

        LoginResponceDTO loginResponceDTO=new LoginResponceDTO(authUtil.generateAccessToken(user),user.getId(),user.getName(),user.getUsername(),user.getUsertype());

            return ResponseEntity.ok(loginResponceDTO);

    }
}
