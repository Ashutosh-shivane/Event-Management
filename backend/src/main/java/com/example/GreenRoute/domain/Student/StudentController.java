package com.example.GreenRoute.domain.Student;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Student")
@RequiredArgsConstructor
public class StudentController {



    private final StudentService studentService;

    @GetMapping("/{userid}")
    private ResponseEntity<StudentOutDto> getprofile(@PathVariable("userid") Long userid){
        return ResponseEntity.ok(studentService.getprofile(userid));
    }


    @PostMapping("save")
    private ResponseEntity<StudentOutDto> saveprofile(@RequestBody StudentInDto studentInDto){
        return ResponseEntity.ok(studentService.saveProfile(studentInDto));
    }

}
