package com.example.GreenRoute.domain.Manager;

import jakarta.persistence.*;
import lombok.*;
import com.example.GreenRoute.domain.entity.User;

import java.time.LocalDate;

@Entity
@Table(name="manager")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class Manager {

//    name: user?.name || '',
//    email: user?.email || '',

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;

    private LocalDate birthDate;

    private String address;

    private String city;

    private String state;

    private String zipcode;

    private String jobTitle;

    private String company;

    private String industry;

    private String yearsExp;

    private String currentSalary;

    private String expectedSalary;

    private String teamSize;

    private String managementLevel;

    private String specializations;

    private String certifications;

    private String languages;

    private String bio;

    private String achievements;

    private String managementPhilosophy;

    private String  eventTypes;

    private String eventSizes;

    private String  budgetRange;

    private String availability;

    private String preferredRoles;

    private String emergencyContactName;

    private String emergencyContactPhone;

    private String emergencyContactRelation;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
