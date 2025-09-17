package com.example.GreenRoute.domain.Event;

import com.example.GreenRoute.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="events")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Event {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private LocalDateTime startAt;
    private LocalDateTime endAt;

    private String location;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private User createdBy;
//
//    private User manager;

    private boolean managedbyManager=false;

    private Integer requiredVolunteer;

    private String status;

    private String category;

    private String tags;

    private String cost;





}

