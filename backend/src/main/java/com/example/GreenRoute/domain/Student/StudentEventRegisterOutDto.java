package com.example.GreenRoute.domain.Student;

import lombok.Data;

@Data
public class StudentEventRegisterOutDto {
    private String eventid;


    private String userid;

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
