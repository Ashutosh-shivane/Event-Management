package com.example.EventManagement.domain.organizeManageEvents;


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

    @PostMapping("SaveManagerInvitation")
    public ResponseEntity<EventInvitationOutDTO> saveManagerInvitation(@RequestBody EventInvitationInDTO eventInvitationInDTO){
        return ResponseEntity.ok(omeService.saveManagerInvitation(eventInvitationInDTO));
    }


    @GetMapping("GetManagerInvitationData/{userid}")
    public ResponseEntity<List<EventInvitationProjection>> getManagerInvitationData(@PathVariable("userid") String userid){

        return ResponseEntity.ok(omeService.GetManagerInvitationData(userid));
    }


    @PostMapping("ManagerAcceptInvtation")
    public ResponseEntity<String> ManagerAcceptInvtation(@RequestBody ManagerAcceptInvtationResponceDto mrDTo ){
        return ResponseEntity.ok(omeService.managerAcceptInvitation(mrDTo));
    }


    @PatchMapping("SelectManagerByOrg/{invitationid}/{managerid}")
    public ResponseEntity<List<EventInvitationOutDTO>> selectManagerByorg(@PathVariable String invitationid,@PathVariable String managerid){
        return ResponseEntity.ok(omeService.selectManagerByorg(invitationid,managerid));
    }




}
