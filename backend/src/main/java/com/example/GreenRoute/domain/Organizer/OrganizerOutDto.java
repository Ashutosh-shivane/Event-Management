package com.example.GreenRoute.domain.Organizer;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OrganizerOutDto {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private LocalDate birthDate;

    private String personalAddress;

    private String personalCity;


    private String personalState;

    private String personalZipcode;

    private String organizationBio;

    private String organizationName;

    private String organizationType;

    private String industry;

    private String establishedYear;

    private String website;

    private String teamSize;

    private String businessAddress;

    private String businessPhone;

    private String businessEmail;

    private String taxId;

    private String businessModel;

    private String targetAudience;

    private String averageEventBudget;

    private String emergencyContactName;

    private String emergencyContactPhone;

    private String emergencyContactRelation;


    private Long userid;


}
