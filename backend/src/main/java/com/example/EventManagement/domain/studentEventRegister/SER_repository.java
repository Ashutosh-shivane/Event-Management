package com.example.EventManagement.domain.studentEventRegister;

import com.example.EventManagement.domain.Event.Event;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SER_repository extends JpaRepository<Event,Long> {

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
    List<SER_Eventlist_DTO> getEventStats(@Param("userid") String userid);



    @Query(value= """
            SELECT s.id,
            	u.name,
            	u.username,
            	st.university,
            	st.degree,
            	st.current_year,
            	s.skills,
            	s.status,
            	s.availability,
            	st.marks,
            	st.bio
            
             FROM student_event_register s
            LEFT JOIN user u ON u.id=s.user_id
            LEFT JOIN student st ON st.user_id=u.id
            WHERE event_id= :eventid
            """,nativeQuery = true)
    List<EventStudentData_DTO> getEventStudentdata(@Param("eventid") String eventid);


    @Modifying
    @Transactional
    @Query(value = "UPDATE student_event_register SET status = :status WHERE event_id = :eventid AND id = :id", nativeQuery = true)
    void updateStudentStatus(@Param("eventid") String eventid,
                             @Param("id") Long id,
                             @Param("status") String status);


}
