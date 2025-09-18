package com.example.EventManagement.domain.organizeManageEvents;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.Event.EventOutDto;
import com.example.EventManagement.domain.Event.EventRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
