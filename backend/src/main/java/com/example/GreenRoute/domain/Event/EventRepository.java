package com.example.GreenRoute.domain.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {


    @Query(value = "SELECT e.id, e.title, e.description, e.start_at, e.end_at, e.location, " +
            "e.managedby_manager, e.required_volunteer, e.status, e.category, e.tags, e.cost, " +
            "u.id AS createdById, u.name AS createdByName " +
            "FROM events e " +
            "JOIN user u ON e.created_by_id = u.id " +
            "WHERE e.id = :eventId",
            nativeQuery = true)
    List<Object[]> findEventDetailsNative(@Param("eventId") Long eventId);

}
