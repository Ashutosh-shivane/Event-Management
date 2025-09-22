package com.example.EventManagement.domain.Student;

import com.example.EventManagement.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


//    name: user?.name || '',
//    email: user?.email || '',

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

   @OneToOne
   @JoinColumn(name = "user_id", referencedColumnName = "id")
   private User user;




}
