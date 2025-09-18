package com.example.EventManagement.domain.Manager;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
