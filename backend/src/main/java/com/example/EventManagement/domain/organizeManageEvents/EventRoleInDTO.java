package com.example.EventManagement.domain.organizeManageEvents;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EventRoleInDTO {
    private String title;

    private String description;

    private String budget;

    private String currency;

    private String responsibilities;

    private String requirments;

    private LocalDate deadline;

    private String eventid;

}
