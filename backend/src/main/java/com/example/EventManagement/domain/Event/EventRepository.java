package com.example.EventManagement.domain.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event,Long> {


    @Query(value = "SELECT e.id, e.title, e.description, e.start_at, e.end_at, e.location, " +
            "e.managedby_manager, e.required_volunteer, e.status, e.category, e.tags, e.cost, " +
            "u.id AS createdById, u.name AS createdByName " +
            "FROM events e " +
            "JOIN user u ON e.created_by_id = u.id " +
            "WHERE e.id = :eventId",
            nativeQuery = true)
    List<Object[]> findEventDetailsNative(@Param("eventId") Long eventId);


    @Query(value = """
            SELECT events.* FROM events LEFT JOIN student_event_register s ON events.id=s.event_id
            WHERE user_id=:userid
            ;
            """,nativeQuery = true)
    List<Event> findByAssignedEventsStudent(@Param("userid") String userid);


    @Query(value = """
            SELECT  e.*
                                 FROM events e
                                 LEFT JOIN event_invitation ei ON e.id=ei.eventid
                                 WHERE ei.selected=1 AND ei.userid=:userid
            """,nativeQuery = true)
    List<Event> findByAssignedEventsManager(@Param("userid") String userid);


    @Query("SELECT e FROM Event e WHERE e.id = :id AND e.createdBy.id = :userId")
    Optional<Event> findByIdAndCreatedById(@Param("id") Long id, @Param("userId") Long userId);


}
