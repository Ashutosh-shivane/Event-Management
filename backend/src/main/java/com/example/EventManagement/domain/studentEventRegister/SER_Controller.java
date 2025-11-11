package com.example.EventManagement.domain.studentEventRegister;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("SER")
@RequiredArgsConstructor
public class SER_Controller {

    private final SER_service serService;

    @GetMapping("/getstats/{userid}")
    public List<SER_Eventlist_DTO> getEventStats(@PathVariable String userid) {
        return serService.getEventStats(userid);
    }

    @GetMapping("/getEventstats/{eventid}")
    public ResponseEntity< Map<String, Object>> getEventstdStats(@PathVariable(name="eventid") String eventid) {
        return ResponseEntity.ok(serService.getEventStudentdata(eventid));
    }

    @PatchMapping("/saveEventstats/{eventid}/save")
    public ResponseEntity<String> saveEventstddata(@PathVariable(name="eventid") String eventid,
                                                   @RequestBody List<StudentStatusUpdateDTO> updates){

        return ResponseEntity.ok(serService.saveEventstddata(eventid,updates));
    }

}


