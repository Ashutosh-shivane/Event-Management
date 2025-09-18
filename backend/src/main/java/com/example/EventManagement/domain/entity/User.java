package com.example.EventManagement.domain.entity;


import com.example.EventManagement.domain.entity.type.AuthProviderType;
import com.example.EventManagement.domain.entity.type.UserType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(unique = true)
    private String username;

    private String name;

    private String password;

    private String providerId;

    @Column(length = 100, nullable = false)
    private String profileCompleted = "13";

    @Enumerated(EnumType.STRING)
    private UserType usertype;

    @Enumerated(EnumType.STRING)
    private AuthProviderType providerType;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
}
