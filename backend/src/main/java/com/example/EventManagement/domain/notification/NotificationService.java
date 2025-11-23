package com.example.EventManagement.domain.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendNotification(String userId, String message, String type) {
        Notification n = new Notification();
        n.setUserid(userId);
        n.setMessage(message);
        n.setType(type);
        notificationRepository.save(n);

        // send WebSocket notification
        messagingTemplate.convertAndSend("/topic/user/" + userId, n);
    }



    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUseridOrderByCreatedAtDesc(userId);
    }

    public String saveMarkAsRead(String notificationid) {

        Notification notification = notificationRepository
                .findById(Long.parseLong(notificationid))
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);   // because field name = isRead → getter/setter = getRead(), setRead()

        notificationRepository.save(notification);

        return "Updated";
    }

    public String saveMarkAllAsRead(String userid) {
        List<Notification> notifications = notificationRepository.findByUserid(userid);

        if (notifications.isEmpty()) {
            return "No notifications";
        }

        for (Notification n : notifications) {
            n.setRead(true);    // because field = isRead → setter = setRead()
        }

        notificationRepository.saveAll(notifications);

        return "All notifications marked as read";
    }
}
