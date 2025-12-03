package com.example.EventManagement.emailVerification;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification,Long> {

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE email_verification SET is_active = 0 WHERE userid = :userid",
            nativeQuery = true
    )
    void updateisActive(@Param("userid") String userid);


    Optional<EmailVerification> findByUseridAndIsActive(String userid, boolean isActive);

}
