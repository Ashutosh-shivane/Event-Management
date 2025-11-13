package com.example.EventManagement.domain.dashboard;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.studentEventRegister.SER_Eventlist_DTO;
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


    @Query(value = """
            SELECT
                COUNT(CASE\s
                    WHEN ei.selected = 1 AND events.end_at < NOW() THEN 1\s
                END) AS past_event_count,
            
                COUNT(CASE\s
                    WHEN ei.selected = 1 AND events.start_at > NOW() THEN 1\s
                END) AS upcoming_event_count,
            
                COUNT(CASE\s
                    WHEN ei.selected = 1\s
                         AND events.start_at > NOW()\s
                         AND ser.status = 'APPROVED' THEN 1\s
                END) AS approved_upcoming_event_count
            FROM events
            LEFT JOIN event_invitation ei\s
                ON events.id = ei.eventid
            LEFT JOIN student_event_register ser
                ON ser.event_id = events.id WHERE ei.userid=:userid;""",nativeQuery = true)
    Object getManagerEventcount(@Param("userid") String userid);


    @Query(value = """
             SELECT
                        e.id AS eventId,
                        e.title AS title,
                        e.location AS location,
                        DATE(e.start_at) AS start_at,
                        e.required_volunteer,
                        COUNT(s.id) AS totalStudents,
                        COUNT(CASE WHEN s.status = 'PENDING' THEN 1 END) AS pendingCount,
                        COUNT(CASE WHEN s.status = 'APPROVED' THEN 1 END) AS approvedCount,
                        COUNT(CASE WHEN s.status = 'REJECTED' THEN 1 END) AS rejectedCount
                    FROM events e
                    LEFT JOIN student_event_register s ON e.id = s.event_id
                    LEFT JOIN event_invitation ei ON e.id=ei.eventid
                    WHERE ei.selected=1 AND ei.userid=:userid AND e.start_at>NOW()
                    GROUP BY e.id, e.title, e.location, e.start_at
        """, nativeQuery = true)
    List<SER_Eventlist_DTO> getMangerUpcomingeventstats(@Param("userid") String userid);


    @Query(value = """
            SELECT events.* FROM events LEFT JOIN event_invitation ei\s
            ON  events.id=ei.eventid WHERE ei.selected=1 AND events.`start_at`>NOW() AND ei.userid=:userid;""",nativeQuery = true)
    List<Event> getMangerAssignedEvent(@Param("userid") String userid);



    //

    @Query(value = """
            SELECT\s
                     COUNT(*) AS total_event_count,
                    \s
                     COUNT(CASE\s
                         WHEN events.start_at > NOW()\s
                         THEN 1\s
                     END) AS upcoming_event_count,
                    \s
                     COUNT(CASE\s
                         WHEN events.end_at < NOW()\s
                         THEN 1\s
                     END) AS past_event_count,
                    \s
                     COALESCE(SUM(CASE\s
                         WHEN events.end_at < NOW()\s
                         THEN (events.cost * events.required_volunteer)\s
                     END), 0) AS total_past_event_cost
                 FROM events
                 WHERE events.created_by_id = :userid;
            """,nativeQuery = true)
    Object getOrganizerEventcount(@Param("userid") String userid);


    @Query(value = """
           SELECT\s
                   events.*,\s
                   COUNT(CASE WHEN ser.status = 'APPROVED' THEN ser.id END) AS total_registered_students,
                   (events.cost * events.required_volunteer) AS total_budget,
                   (events.cost * COUNT(CASE WHEN ser.status = 'APPROVED' THEN ser.id END)) AS used_budget
               FROM events
               LEFT JOIN student_event_register ser
                   ON ser.event_id = events.id
               WHERE events.created_by_id = :userid
               GROUP BY events.id
               ORDER BY events.end_at DESC;
        """, nativeQuery = true)
    List<OED_OutDto> getOrgnizerEventData(@Param("userid") String userid);







}
