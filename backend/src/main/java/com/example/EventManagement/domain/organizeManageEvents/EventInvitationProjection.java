package com.example.EventManagement.domain.organizeManageEvents;

public interface EventInvitationProjection {
    Long getId();
    String getEventname();
    String getOrganizername();
    String getSentAt();
    String getRolename();
    String getRoleDesc();
    String getRoleDeadline();
    String getBudget();
    String getManagerMsg();
    String getResponsibilities();
    String getRequirments();
    String getStatus();
}

