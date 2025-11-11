package com.example.EventManagement.domain.Manager;

import com.example.EventManagement.domain.Event.EventOutDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerService managerService;

    @GetMapping("/{userid}")
    private ResponseEntity<ManagerOutDto> getprofileData(@PathVariable("userid") Long userid){

        return ResponseEntity.ok(managerService.getProfileData(userid));
    }


    @PostMapping("/save")
    private ResponseEntity<ManagerOutDto> saveprofile(@RequestBody ManagerInDto managerInDto){
        return ResponseEntity.ok(managerService.saveProfileData(managerInDto));
    }

    @GetMapping("/Assigneventlist/{userid}")
    public ResponseEntity<List<EventOutDto>> AllEvent(@PathVariable String userid){

        System.out.println("here");

        return ResponseEntity.ok(managerService.listAllAssignedEvent(userid));
    }
}
