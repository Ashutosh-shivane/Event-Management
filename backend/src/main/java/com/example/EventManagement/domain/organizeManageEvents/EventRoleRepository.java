package com.example.EventManagement.domain.organizeManageEvents;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRoleRepository extends JpaRepository<EventRole,Long> {


    List<EventRole> findByEventid(String eventid);

}
