package com.example.EventManagement.domain.organizeManageEvents;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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





}

