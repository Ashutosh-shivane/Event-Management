package com.example.EventManagement.domain.Event;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Event")
public class EventController {

    private final EventService eventService;
    public EventController(EventService eventService)
    { this.eventService = eventService; }

    @PostMapping("/create")
    public ResponseEntity<EventOutDto> CreateEvent(@RequestBody EventInDto eventInDto){
        return ResponseEntity.ok(eventService.CreatEvent(eventInDto));
    }

    @GetMapping("/eventlist")
    public ResponseEntity<List<EventOutDto>> AllEvent(){

        return ResponseEntity.ok(eventService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Object[]>> GetEventDetails(@PathVariable Long id){

        return ResponseEntity.ok(eventService.find(id));
    }



    @GetMapping("/update/{eventid}/{userid}")
    public ResponseEntity<EventOutDto> GetEventDataForUpdate(@PathVariable Long eventid,@PathVariable String userid){

        return ResponseEntity.ok(eventService.GetEventDataForUpdate(eventid,userid));
    }



    @PutMapping("/update/{eventid}/{userid}")
    public ResponseEntity<EventOutDto> SaveUpdatedEventData(@PathVariable Long eventid,@PathVariable String userid,@RequestBody EventInDto eventInDto){

        return ResponseEntity.ok(eventService.SaveUpdatedEventData(eventid,userid,eventInDto));
    }


}
