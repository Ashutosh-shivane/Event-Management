package com.example.EventManagement.domain.dashboard;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.Event.EventOutDto;
import com.example.EventManagement.domain.studentEventRegister.SER_Eventlist_DTO;
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

    public Map<String, Object> getManagerData(String userid) {

            Map<String, Object> data = new HashMap<>();

            // ✅ Fetch the count data (returned as Object[])
            Object[] countData = (Object[]) dashboardRepository.getManagerEventcount(userid);

            // Extract safely (use string formatting to avoid class cast issues)
            String pastEventCount = countData[0] != null ? countData[0].toString() : "0";
            String upcomingEventCount = countData[1] != null ? countData[1].toString() : "0";
            String approvedUpcomingCount = countData[2] != null ? countData[2].toString() : "0";

            // ✅ Fetch upcoming event stats
            List<SER_Eventlist_DTO> eventListDtos = dashboardRepository.getMangerUpcomingeventstats(userid);

            // ✅ Fetch assigned events & convert to DTOs
            List<Event> events = dashboardRepository.getMangerAssignedEvent(userid);
            List<EventOutDto> eventOutDtos = events.stream()
                    .map(event -> modelMapper.map(event, EventOutDto.class))
                    .collect(Collectors.toList());

            // ✅ Populate data map
            data.put("past_event_count", pastEventCount);
            data.put("upcoming_event_count", upcomingEventCount);
            data.put("approved_upcoming_event_count", approvedUpcomingCount);
            data.put("upcoming_event_stats", eventListDtos);
            data.put("assigned_events", eventOutDtos);

            return data;


    }

    public Map<String, Object> getOrganizerData(String userid) {

        Map<String, Object> data = new HashMap<>();

        // Step 1: Get event counts and totals
        Object result = dashboardRepository.getOrganizerEventcount(userid);

        if (result != null) {
            Object[] row = (Object[]) result;

            data.put("total_event_count", String.valueOf(row[0]));
            data.put("upcoming_event_count", String.valueOf(row[1]));
            data.put("past_event_count", String.valueOf(row[2]));
            data.put("total_past_event_cost", String.valueOf(row[3]));
        } else {
            data.put("total_event_count", "0");
            data.put("upcoming_event_count", "0");
            data.put("past_event_count", "0");
            data.put("total_past_event_cost", "0");
        }

        // Step 2: Get detailed event data
        List<OED_OutDto> results = dashboardRepository.getOrgnizerEventData(userid);



        // Step 3: Put data into map
        data.put("event_details", results);

        return data;


    }
}
