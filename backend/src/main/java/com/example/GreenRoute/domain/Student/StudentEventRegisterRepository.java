package com.example.GreenRoute.domain.Student;

import com.example.GreenRoute.domain.Event.Event;
import com.example.GreenRoute.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentEventRegisterRepository extends JpaRepository<StudentEventRegister ,Long> {

    Optional<StudentEventRegister> findByUserAndEvent(User user, Event event);

}
