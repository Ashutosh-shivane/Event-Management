package com.example.EventManagement.domain.Student;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="StudentEventRegister")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class StudentEventRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String prevExp;

    private String reasonforevent;

    private String skills;

    private String notes;

    private String availability;

    private String haveBike;

    private String transportMedium;

    private String dietaryRestrictions;

    private String status;




}
