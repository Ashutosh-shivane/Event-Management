package com.example.EventManagement.domain.dashboard;

import com.example.EventManagement.domain.Event.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DashboardRepository extends JpaRepository<Event,Long> {

    @Query(value = """
            SELECT
                COUNT(CASE\s
                    WHEN ser.status = 'APPROVED' AND events.end_at < NOW() THEN 1\s
                END) AS past_event_count,
               \s
                COUNT(CASE\s
                    WHEN ser.status = 'APPROVED' AND events.start_at > NOW() THEN 1\s
                END) AS upcoming_event_count,
               \s
                COALESCE(ROUND(SUM(CASE\s
                    WHEN ser.status = 'APPROVED' AND events.end_at < NOW()\s
                    THEN TIMESTAMPDIFF(SECOND, events.start_at, events.end_at)\s
                END) / 3600, 2), 0) AS total_hours
            FROM events
            LEFT JOIN student_event_register ser\s
                ON events.id = ser.event_id
            WHERE ser.user_id = :userid;
            """,nativeQuery = true)
    Object getStudentEventcount(@Param("userid") String userid);


    @Query(value = """
            SELECT events.*\s
            	FROM events\s
            	LEFT JOIN student_event_register ser\s
            	ON events.id=ser.event_id\s
            	WHERE ser.user_id=:userid\s
            	AND ser.status="APPROVED"
            	AND events.start_at>NOW();
            """,nativeQuery = true)
    List<Event> getStudentActiveEvent(@Param("userid") String userid);


    @Query(value = """
            SELECT events.*\s
            	FROM events
            
            	WHERE events.id NOT IN(SELECT ser.event_id FROM student_event_register ser WHERE ser.user_id=:userid )
            	AND events.start_at>NOW();
            """,nativeQuery = true)
    List<Event> getStudentRegisterEvent(@Param("userid") String userid);

}
