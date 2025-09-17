package com.example.GreenRoute.domain.organizeManageEvents;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EventRoleOUTDTO {

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
