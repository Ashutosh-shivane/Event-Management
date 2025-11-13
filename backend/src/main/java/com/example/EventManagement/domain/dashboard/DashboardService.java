package com.example.EventManagement.domain.dashboard;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.Event.EventOutDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;
    private final ModelMapper modelMapper;

    public Map<String, Object> getStudentDate(String userid) {

            Map<String, Object> data = new HashMap<>();

            // 1️⃣ Fetch summary stats (count + total hours)
            Object num = dashboardRepository.getStudentEventcount(userid);
            if (num != null) {
                // JPA returns Object[] for multiple columns
                Object[] result = (Object[]) num;

                // Safely extract numeric values
                String pastEventCount = result[0] != null ? result[0].toString() : "0";
                String upcomingEventCount = result[1] != null ? result[1].toString() : "0";
                String totalHours = result[2] != null ? result[2].toString() : "0";

                data.put("past_event_count", pastEventCount);
                data.put("upcoming_event_count", upcomingEventCount);
                data.put("total_hours", totalHours);
            } else {
                data.put("past_event_count", 0L);
                data.put("upcoming_event_count", 0L);
                data.put("total_hours", 0.0);
            }

            // 2️⃣ Fetch active events and convert to DTOs
            List<Event> activeEvents = dashboardRepository.getStudentActiveEvent(userid);
            List<EventOutDto> activeEventDtos = activeEvents.stream()
                    .map(event -> modelMapper.map(event, EventOutDto.class))
                    .collect(Collectors.toList());
            data.put("active_events", activeEventDtos);

            // 3️⃣ Fetch registered events and convert to DTOs
            List<Event> registeredEvents = dashboardRepository.getStudentRegisterEvent(userid);
            List<EventOutDto> registeredEventDtos = registeredEvents.stream()
                    .map(event -> modelMapper.map(event, EventOutDto.class))
                    .collect(Collectors.toList());
            data.put("register_events", registeredEventDtos);

            return data;





    }
}
