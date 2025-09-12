package com.example.GreenRoute.domain.Organizer;

import com.example.GreenRoute.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="Organizer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Organizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    name: userdata?.name || '',
//    email: userdata?.email || '',


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


    @OneToOne
    @JoinColumn(name="user_id" ,referencedColumnName = "id")
    private User user;



}
