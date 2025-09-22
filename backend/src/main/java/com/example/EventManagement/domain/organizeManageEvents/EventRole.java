package com.example.EventManagement.domain.organizeManageEvents;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="ManagerRole")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EventRole {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String budget;

    private String currency;

    private String responsibilities;

    private String requirments;

    private LocalDate deadline;

    private String eventid;
}
