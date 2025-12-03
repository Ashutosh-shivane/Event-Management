package com.example.EventManagement.domain.notification;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.Event.EventRepository;
import com.example.EventManagement.domain.Student.StudentEventRegister;
import com.example.EventManagement.domain.entity.User;
import com.example.EventManagement.domain.entity.type.UserType;
import com.example.EventManagement.domain.notification.projection.EIForOrgProjection;
import com.example.EventManagement.domain.notification.projection.StudentRegisterUpdateProjection;
import com.example.EventManagement.domain.organizeManageEvents.EventInvitation;
import com.example.EventManagement.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationControlService {






        private final UserRepository userRepository;
        private final NotificationService notificationService;
        private final NotificationRepository notificationRepository;
        private final EventRepository eventRepository;

        // Notify all students for a new event
        public void notifyStudentsForNewEvent(String eventTitle) {

            List<User> students = userRepository.findByUsertype(UserType.STUDENT);

            for (User s : students) {
                notificationService.sendNotification(
                        String.valueOf(s.getId()),
                        "New Event: " + eventTitle,
                        "EVENT_CREATED"
                );
            }
        }

        public void notifyMangerForInvitation(String managerId){

            notificationService.sendNotification(
                  managerId,
                    "You have new Invitation " ,
                    "INVITATION"
            );
        }


        public void notifyOrganizerManagerReplied(EventInvitation invitation){

            EIForOrgProjection eiForOrgProjection=notificationRepository.getEventInvitationDetailsForOrg(invitation.getId());

            notificationService.sendNotification(
                   Long.toString( eiForOrgProjection.getOrgId()),
                    "The "+eiForOrgProjection.getManagername() +" Replied for event "+eiForOrgProjection.getEventname() ,
                    "Replied"
            );





        }

        public void notifyManagerThatSelected(String eventid,String managerid){

            Event event=eventRepository.findById(Long.parseLong(eventid)).orElse(null);

            notificationService.sendNotification(
                    managerid,
                    "You are selected For event "+event.getTitle(),
                    "Selected"
            );
        }

        public void notifyStudentForSelected(List studentEventRegisterid){

            List<StudentRegisterUpdateProjection> registers = notificationRepository.findAllStudentUpdateEventStatus(studentEventRegisterid);

            String eventName = "";

            for(StudentRegisterUpdateProjection register:registers){
                notificationService.sendNotification(
                        register.getUserId(),
                        "You are "+register.getStatus()+" For event "+register.getEventname(),
                        "updates"
                );
            }




        }
}



