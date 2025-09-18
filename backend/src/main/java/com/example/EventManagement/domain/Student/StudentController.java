package com.example.EventManagement.domain.Student;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("Student")
@RequiredArgsConstructor
public class StudentController {



    private final StudentService studentService;

    @GetMapping("/{userid}")
    private ResponseEntity<StudentOutDto> getprofile(@PathVariable("userid") Long userid){
        return ResponseEntity.ok(studentService.getprofile(userid));
    }


    @PostMapping("/save")
    private ResponseEntity<StudentOutDto> saveprofile(@RequestBody StudentInDto studentInDto){
        return ResponseEntity.ok(studentService.saveProfile(studentInDto));
    }

    @GetMapping("/GetprofileCompleted/{userid}/{eventid}")
    private ResponseEntity<Map<String, Object>> getprofilecompleted(@PathVariable("userid") Long userid, @PathVariable("eventid") String eventid){
        return ResponseEntity.ok(studentService.getprofilecompleted(userid,eventid));
    }

    @PostMapping("/RegisterEvent")
    private ResponseEntity<StudentEventRegisterOutDto> registerEvent(@RequestBody StudentEventRegisterInDto studentEventRegisterInDto){

        return ResponseEntity.ok(studentService.registerForEvent(studentEventRegisterInDto));

    }

}
