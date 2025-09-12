package com.example.GreenRoute.domain.Organizer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizerRepository extends JpaRepository<Organizer ,Long> {

    Organizer findByUserId(Long userId);
}
