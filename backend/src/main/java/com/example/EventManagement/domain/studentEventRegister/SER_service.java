package com.example.EventManagement.domain.studentEventRegister;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.Event.EventOutDto;
import com.example.EventManagement.domain.Event.EventRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SER_service {

    @Autowired
    private ModelMapper modelMapper;

    private final SER_repository serRepository;

    private final EventRepository eventRepository;


    public List<SER_Eventlist_DTO> getEventStats(String userid) {
        return serRepository.getEventStats(userid);
    }


    public Map<String, Object> getEventStudentdata(String eventid) {


        Event event = eventRepository.findById(Long.parseLong(eventid))
                .orElseThrow();

        EventOutDto eventOutDto = modelMapper.map(event, EventOutDto.class);

        List<EventStudentData_DTO> students = serRepository.getEventStudentdata(eventid);

        Map<String, Object> response = new HashMap<>();
        response.put("event", eventOutDto);
        response.put("students", students);

        return response;


    }


    @Transactional
    public String saveEventstddata(String eventid, List<StudentStatusUpdateDTO> updates) {


        for (StudentStatusUpdateDTO update : updates) {

            System.out.println(eventid+" " +update.getId()+" "+update.getStatus());
            serRepository.updateStudentStatus(eventid, update.getId(), update.getStatus());
        }

        return "saved";

    }
}
