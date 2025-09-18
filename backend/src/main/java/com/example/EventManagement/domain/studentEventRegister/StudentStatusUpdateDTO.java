package com.example.EventManagement.domain.studentEventRegister;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentStatusUpdateDTO {
    Long id;
    String status;
}
