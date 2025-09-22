package com.example.EventManagement.domain.repository;

import com.example.EventManagement.domain.entity.User;
import com.example.EventManagement.domain.entity.type.AuthProviderType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByProviderIdAndProviderType(String providerId, AuthProviderType authProviderType);
}
