package com.example.GreenRoute.domain.organizeManageEvents;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OME_service {

    private final OME_repository omeRepository;
    private final EventRoleRepository eventRoleRepository;

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

        return data;
    }
}
