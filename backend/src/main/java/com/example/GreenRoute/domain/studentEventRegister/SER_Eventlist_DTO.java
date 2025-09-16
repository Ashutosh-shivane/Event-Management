package com.example.GreenRoute.domain.studentEventRegister;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface SER_Eventlist_DTO {

    Long getEventId();
    String getTitle();
    String getLocation();
    LocalDate getStartAt();
    String getRequired_volunteer();
    Long getTotalStudents();
    Long getPendingCount();
    Long getApprovedCount();
    Long getRejectedCount();
}
