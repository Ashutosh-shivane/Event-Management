package com.example.EventManagement.domain.organizeManageEvents;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.Event.EventOutDto;
import com.example.EventManagement.domain.Event.EventRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OME_service {

    private final OME_repository omeRepository;
    private final EventRoleRepository eventRoleRepository;
    private final EventInvitationRepository eventInvitationRepository;
    private final EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<EventList_DTO> getEventsByCreator(Long userId) {

        return omeRepository.findByCreatedBy_Id(userId);
    }

    public List<EventRoleOUTDTO> saveRoleData(EventRoleInDTO eventRoleInDTO) {


        EventRole eventRole=modelMapper.map(eventRoleInDTO,EventRole.class);

        eventRoleRepository.save(eventRole);


        List<EventRole> eventRoles=eventRoleRepository.findByEventid(eventRoleInDTO.getEventid());



        return eventRoles.stream()
                .map(role -> modelMapper.map(role, EventRoleOUTDTO.class))
                .toList();




    }

    public Map<String, Object> getHomeData(String eventid) {

        Map<String ,Object> data=new HashMap<>();

        List<ManagerListDto>managerlist=eventInvitationRepository.getmangerlist();

        List<EventRole> eventRoles=eventRoleRepository.findByEventid(eventid);

        List<EventRoleOUTDTO>eventRoleOUTDTOS=eventRoles.stream()
                .map(role -> modelMapper.map(role, EventRoleOUTDTO.class))
                .toList();

        List<EventInvitation>eventInvitations=eventInvitationRepository.findByEventid(eventid);

        List<EventInvitationOutDTO>eventInvitationOutDTOS=eventInvitations.stream()
                        .map(role->modelMapper.map(role,EventInvitationOutDTO.class))
                                .toList();

        Event event=eventRepository.findById(Long.parseLong(eventid)).orElseThrow();

        EventOutDto eventOutDto=modelMapper.map(event,EventOutDto.class);



        data.put("event",eventOutDto);

        data.put("managerlist",managerlist);
        data.put("rolelist",eventRoleOUTDTOS);
        data.put("invitationList",eventInvitationOutDTOS);



        return data;
    }


    public EventInvitationOutDTO saveManagerInvitation(EventInvitationInDTO eventInvitationInDTO) {

        EventInvitation eventInvitation=modelMapper.map(eventInvitationInDTO,EventInvitation.class);

        EventInvitation alreadyInvited=eventInvitationRepository.findByRoleidAndUserid(eventInvitation.getRoleid(),eventInvitation.getUserid());

        EventInvitationOutDTO eventInvitationOutDTO;
        if(alreadyInvited!=null){
            eventInvitationOutDTO=modelMapper.map(alreadyInvited,EventInvitationOutDTO.class);

        }else {
            eventInvitationRepository.save(eventInvitation);

            eventInvitationOutDTO = modelMapper.map(eventInvitation, EventInvitationOutDTO.class);
        }







        return eventInvitationOutDTO;
    }


    public List<EventInvitationProjection> GetManagerInvitationData(String userid) {

        List<EventInvitationProjection> list=eventInvitationRepository.findByUserid(userid);

//        List<EventInvitationOutDTO> result=list.stream().map(ele->(modelMapper.map(ele,EventInvitationOutDTO.class))).toList();


        return list;
    }

    public String managerAcceptInvitation(ManagerAcceptInvtationResponceDto mrDto) {

        System.out.println(mrDto);

        // Fetch the existing invitation
        EventInvitation invitation = eventInvitationRepository.findById(mrDto.getId())
                .orElseThrow(() -> new RuntimeException("Invitation not found with id: " + mrDto.getId()));

        // Update common fields
        invitation.setRespondedAt(LocalDateTime.now());

        // Handle based on caller type
        switch (mrDto.getCaller().toUpperCase()) {
            case "COUNTER_OFFER":
                invitation.setStatus("COUNTER_OFFER");
                invitation.setManager_msg(mrDto.getManagermsg());
                invitation.setProposed_budget(String.valueOf(mrDto.getCounteroffer()));
                break;

            case "DECLINE":
                invitation.setStatus("DECLINED");
                break;

            case "ACCEPT":
                invitation.setStatus("ACCEPTED");
                break;

            default:
                throw new IllegalArgumentException("Invalid caller type: " + mrDto.getCaller());
        }

        // Save updated record
        eventInvitationRepository.save(invitation);

        return "Invitation " + invitation.getStatus() + " successfully.";
    }

    public List<EventInvitationOutDTO> selectManagerByorg(String invitationid, String managerid) {

        EventInvitation eventInvitation=eventInvitationRepository.findByIdAndUserid(Long.parseLong(invitationid),managerid);

        eventInvitation.setSelected(Integer.toString(1));

        eventInvitation.setStatus("SELECTED");

        eventInvitationRepository.save(eventInvitation);

        String eventid=eventInvitation.getEventid();


        List<EventInvitation> res=eventInvitationRepository.findByEventid(eventid);

        List<EventInvitationOutDTO> response=res.stream().map(r->modelMapper.map(r,EventInvitationOutDTO.class)).toList();



        return response;
    }
}
