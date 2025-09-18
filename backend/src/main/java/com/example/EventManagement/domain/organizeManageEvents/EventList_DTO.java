package com.example.EventManagement.domain.organizeManageEvents;

import java.time.LocalDateTime;

public interface EventList_DTO {
    Long getId();
    String getTitle();
    String getLocation();
    LocalDateTime getStartAt();
    LocalDateTime getEndAt();
    Integer getRequiredVolunteer();
}
