package com.example.GreenRoute.domain.organizeManageEvents;

import jakarta.persistence.*;
import lombok.*;

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

    private String msg;

    private String status;

    private String selected;
}
