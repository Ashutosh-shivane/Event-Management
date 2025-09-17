package com.example.GreenRoute.domain.organizeManageEvents;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("OME")
@RequiredArgsConstructor
public class OME_controller {

    private final OME_service omeService ;



    @GetMapping("/createdBy/{userId}")
    public List<EventList_DTO> getEventsByCreator(@PathVariable Long userId) {
        return omeService.getEventsByCreator(userId);
    }

    @PostMapping("/save/Role")
    public ResponseEntity<List<EventRoleOUTDTO>> saveRoleData(@RequestBody EventRoleInDTO eventRoleInDTO){
        return ResponseEntity.ok(  omeService.saveRoleData(eventRoleInDTO));
    }

    @GetMapping("/GetData/{eventid}")
    public ResponseEntity<Map<String ,Object>> getHomeData(@PathVariable("eventid") String eventid){

        return ResponseEntity.ok(omeService.getHomeData(eventid));

    }


}
