package com.example.EventManagement.domain.organizeManageEvents;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventInvitationRepository extends JpaRepository<EventInvitation,Long> {

    @Query(value="""
            SELECT u.id ,
            u.name,
            u.username,
            'Event manager' AS role,
            m.years_exp,
            m.specializations,
            '' AS rating,
            m.availability
            FROM user u LEFT JOIN manager m 
            ON u.id=m.user_id
            WHERE u.usertype='MANAGER'""" ,nativeQuery = true)

    List<ManagerListDto> getmangerlist();

    List<EventInvitation> findByEventid(String eventid);

    EventInvitation findByRoleidAndUserid(String roleid, String userid);


    @Query(value = """
    SELECT 
        ei.id AS id,
        e.title AS eventname,
        user.name AS organizername,
        ei.sent_at AS sentAt,
        mr.title AS rolename,
        mr.description AS roleDesc,
        mr.deadline AS roleDeadline,
        mr.budget AS budget,
        ei.manager_msg AS managerMsg,
        mr.responsibilities AS responsibilities,
        mr.requirments AS requirments,
        ei.status AS status
    FROM event_invitation ei
    LEFT JOIN manager_role mr ON mr.id = ei.roleid
    LEFT JOIN events e ON e.id = ei.eventid
    LEFT JOIN user ON e.created_by_id = user.id
    WHERE ei.userid = :userid order by ei.id desc
    """, nativeQuery = true)
    List<EventInvitationProjection> findByUserid(@Param("userid") String userid);


//    EventInvitation findByIDAndUserid(Long  id,String userid);

    EventInvitation findByIdAndUserid(Long id, String userid);






}

