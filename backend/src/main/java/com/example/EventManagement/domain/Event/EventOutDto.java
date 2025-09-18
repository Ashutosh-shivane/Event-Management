package com.example.EventManagement.domain.Event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventOutDto {
    private Long id;

    private String Title;

    private String description;

    private LocalDateTime startAt;
    private LocalDateTime endAt;

    private String location;


    private boolean managedbyManager=false;

//    private User CreatedBy;

    private String requiredVolunteer;

    private String status;

    private String cost;

    private String category;

    private String tags;


}
