package com.example.EventManagement.domain.notification;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor

public class NotificationController {

    private final NotificationService notificationService;



    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable String userId) {
        return notificationService.getUserNotifications(userId);
    }

    @PutMapping("/read/{notificationid}")
    public ResponseEntity<String> saveMarkAsRead(@PathVariable String notificationid){
        return  ResponseEntity.ok( notificationService.saveMarkAsRead(notificationid));
    }

    @PutMapping("/read_all/{userid}")
    public ResponseEntity<String> saveMarkAllAsRead(@PathVariable String userid){
        return  ResponseEntity.ok( notificationService.saveMarkAllAsRead(userid));
    }


}
