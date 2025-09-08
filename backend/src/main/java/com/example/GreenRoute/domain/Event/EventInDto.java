package com.example.GreenRoute.domain.Event;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class EventInDto {
    private Long id;

    private String Title;

    private String description;

    private LocalDateTime startAt;
    private LocalDateTime endAt;

    private String location;




    private boolean managedbyManager=false;

    private String requiredVolunteer;

    private String status;

    private String category;

    private String tags;

    private String cost;

    private Long createdid;

}
