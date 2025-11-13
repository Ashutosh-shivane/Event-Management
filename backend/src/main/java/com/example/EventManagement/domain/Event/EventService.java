package com.example.EventManagement.domain.Event;

import com.example.EventManagement.domain.entity.User;
import com.example.EventManagement.domain.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private EventRepository eventRepository;
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public EventService(EventRepository eventRepository,UserRepository userRepository){
        this.eventRepository=eventRepository;
        this.userRepository=userRepository;
    }


    public EventOutDto CreatEvent(EventInDto ev){

        Event  event=modelMapper.map(ev,Event.class);

        System.out.println(ev);
        System.out.println(event);

        User creator = userRepository.findById(ev.getCreatedid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        event.setCreatedBy(creator);



        event.setStatus("Event Created");

        EventOutDto res=modelMapper.map(eventRepository.save(event),EventOutDto.class);

        return res;
    }

    public List<EventOutDto> listAll(){


         return eventRepository.findAll()
                .stream()
                .map(event -> modelMapper.map(event, EventOutDto.class))
                .toList();
    }

    public List<Object[]> find(Long id){

//        Event ev=eventRepository.findById(id).orElseThrow();


        return eventRepository.findEventDetailsNative(id) ;
    }

    public Event Update(Event event){
        return eventRepository.save(event);
    }

    public EventOutDto GetEventDataForUpdate(Long eventid, String userid) {

        Event event=eventRepository.findByIdAndCreatedById(eventid,Long.parseLong(userid)).orElse(null);

        EventOutDto eventOutDto= new EventOutDto();

        if(event!=null){

            modelMapper.map(event,eventOutDto);

        }

        return eventOutDto;
    }

    public EventOutDto SaveUpdatedEventData(Long eventid, String userid,EventInDto eventInDto) {

        Event event=eventRepository.findByIdAndCreatedById(eventid,Long.parseLong(userid)).orElse(null);

        if(event!=null){
            modelMapper.map(eventInDto,event);
            event.setId(eventid);
//            event.set
            event.setStatus("EVENT UPDATED");
        }

        eventRepository.save(event);


        return new EventOutDto();
    }
}
