package com.example.GreenRoute.domain.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student ,Long> {

    // 2. Find profile by User id
    Student findByUserId(Long userId);
}
