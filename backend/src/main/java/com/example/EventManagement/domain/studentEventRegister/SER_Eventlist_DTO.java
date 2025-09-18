package com.example.EventManagement.domain.studentEventRegister;

import java.time.LocalDate;

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
