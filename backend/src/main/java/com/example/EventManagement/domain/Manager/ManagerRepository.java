package com.example.EventManagement.domain.Manager;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager,Long> {

    Manager findByUserId(Long userId);
}
