package com.example.EventManagement.domain.dashboard;

import com.example.EventManagement.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


public interface OED_OutDto {
    Long getId();
    String getTitle();
    String getDescription();
    LocalDateTime getStartAt();
    LocalDateTime getEndAt();
    String getLocation();
    Boolean getManagedbyManager();
    String getRequiredVolunteer();
    String getStatus();
    String getCost();
    String getCategory();
    String getTags();
    String getCreatedById();
    String getTotalRegisteredStudents();
    String getTotalBudget();
    String getUsedBudget();
}
