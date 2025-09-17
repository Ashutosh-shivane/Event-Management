package com.example.GreenRoute.domain.organizeManageEvents;

import com.example.GreenRoute.domain.Event.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OME_repository extends JpaRepository<Event,Long> {

    // Derived query with projection
    List<EventList_DTO> findByCreatedBy_Id(Long createdById);



}
