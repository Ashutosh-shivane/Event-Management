package com.example.EventManagement.domain.organizeManageEvents;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="EventInvitation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class EventInvitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventid;

    private String roleid;

    private String userid;

    private String proposed_budget;

    private String manager_msg;

    private LocalDateTime sentAt;

    private LocalDateTime respondedAt;

    private String status;

    private String selected;
}
