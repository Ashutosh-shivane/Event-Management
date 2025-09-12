package com.example.GreenRoute.domain.Organizer;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Organizer")
@RequiredArgsConstructor
public class OrganizerController {

    private final OrganizerService organizerService;

    @GetMapping("/{userid}")
    private ResponseEntity<OrganizerOutDto> getOrganizerProfile(@PathVariable("userid") Long userid){
        return ResponseEntity.ok(organizerService.getOrganizerProfile(userid));

    }

    @PostMapping("/save")
    private ResponseEntity<OrganizerOutDto> saveOrganizerProfile(@RequestBody OrganizerInDto organizerInDto){

        return ResponseEntity.ok(organizerService.saveOrganizerProfile(organizerInDto));
    }




}
