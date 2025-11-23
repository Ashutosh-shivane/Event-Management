package com.example.EventManagement.domain.notification;



import com.example.EventManagement.domain.Student.StudentEventRegister;
import com.example.EventManagement.domain.notification.projection.EIForOrgProjection;
import com.example.EventManagement.domain.notification.projection.StudentRegisterUpdateProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByUseridOrderByCreatedAtDesc(String userId);

    List<Notification> findByUserid(String userId);


    @Query(value =
            "SELECT u.id AS orgId, " +
                    "       (SELECT u2.name FROM user u2 WHERE u2.id = ei.userid) AS managername, " +
                    "       e.title AS eventname " +
                    "FROM user u " +
                    "LEFT JOIN events e ON e.created_by_id = u.id " +
                    "LEFT JOIN event_invitation ei ON ei.eventid = e.id " +
                    "WHERE ei.id = :invitationId",
            nativeQuery = true)
    EIForOrgProjection getEventInvitationDetailsForOrg(@Param("invitationId") Long invitationId);


    @Query(
            value = """
                    
           SELECT student_event_register.id,
           events.title AS eventname,
            user_id AS userId,\s
            student_event_register.status
             FROM student_event_register\s
            LEFT JOIN events\s
            ON events.id=student_event_register.event_id
            WHERE student_event_register.id IN (:ids)
            """,
            nativeQuery = true
    )
    List<StudentRegisterUpdateProjection> findAllStudentUpdateEventStatus(@Param("ids") List<Long> ids);

}
