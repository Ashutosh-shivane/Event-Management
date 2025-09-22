package com.example.EventManagement.domain.organizeManageEvents;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventInvitationOutDTO {
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
