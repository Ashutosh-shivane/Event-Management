package com.example.GreenRoute.domain.Manager;

import com.example.GreenRoute.domain.Student.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager,Long> {

    Manager findByUserId(Long userId);
}
