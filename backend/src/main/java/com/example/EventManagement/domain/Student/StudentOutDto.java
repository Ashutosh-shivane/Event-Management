package com.example.EventManagement.domain.Student;

import lombok.Data;

import java.time.LocalDate;

@Data

public class StudentOutDto {



    private Long id;

    private String email;

    private String name;



    private String phone;

    private LocalDate birthdate;

    private String address;

    private String city;

    private String state;

    private String zipcode;

    private String university;

    private String college;

    private String degree;

    private String major;

    private String graduationYear;

    private String currentYear;

    private String  marks;

    private String bio;

    private String interests;

    private String skills;

    private String languages;

    private String eventtypes;

    private String availability;

    private String volunteerExperience;

    private String emergencyContactName;

    private String emergencyContactPhone;

    private String emergencyContactRelation;

//    private User user;


}
