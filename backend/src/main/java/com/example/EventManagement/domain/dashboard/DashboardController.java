package com.example.EventManagement.domain.dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("Dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;


    @GetMapping("student/{userid}")
    public ResponseEntity<Map<String,Object>> getStudentData(@PathVariable String userid){
        return ResponseEntity.ok(dashboardService.getStudentDate(userid));

    }


    @GetMapping("manager/{userid}")
    public ResponseEntity<Map<String,Object>> getManagerData(@PathVariable String userid){
        return ResponseEntity.ok(dashboardService.getManagerData(userid));

    }

    @GetMapping("organizer/{userid}")
    public ResponseEntity<Map<String,Object>> getOrganizerData(@PathVariable String userid){
        return ResponseEntity.ok(dashboardService.getOrganizerData(userid));

    }


}
