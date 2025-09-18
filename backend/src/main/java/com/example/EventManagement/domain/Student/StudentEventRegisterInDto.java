package com.example.EventManagement.domain.Student;

import lombok.Data;

@Data
public class StudentEventRegisterInDto {

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
