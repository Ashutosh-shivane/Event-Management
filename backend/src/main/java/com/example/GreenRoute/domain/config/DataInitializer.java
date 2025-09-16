package com.example.GreenRoute.domain.config;

import com.example.GreenRoute.domain.Event.Event;
import com.example.GreenRoute.domain.Event.EventRepository;
import com.example.GreenRoute.domain.Student.StudentEventRegister;
import com.example.GreenRoute.domain.Student.StudentEventRegisterRepository;
import com.example.GreenRoute.domain.entity.User;
import com.example.GreenRoute.domain.entity.type.UserType;
import com.example.GreenRoute.domain.entity.type.AuthProviderType;
import com.example.GreenRoute.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final StudentEventRegisterRepository studentEventRegisterRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            // Create manager & organizer
            User manager = User.builder()
                    .username("m@gmail.com")
                    .name("Manager One")
                    .password(passwordEncoder.encode("m"))
                    .usertype(UserType.MANAGER)
                    .providerType(AuthProviderType.EMAIL)
                    .profileCompleted("100")
                    .build();

            User organizer = User.builder()
                    .username("o@gmail.com")
                    .name("Organizer One")
                    .password(passwordEncoder.encode("o"))
                    .usertype(UserType.ORGANIZER)
                    .providerType(AuthProviderType.EMAIL)
                    .profileCompleted("100")
                    .build();

            userRepository.save(manager);
            userRepository.save(organizer);

            // Create 50 student users
            List<User> students = new ArrayList<>();
            for (int i = 1; i <= 50; i++) {
                User student = User.builder()
                        .username("student" + i + "@gmail.com")
                        .name("Student " + i)
                        .password(passwordEncoder.encode("s" + i))
                        .usertype(UserType.STUDENT)
                        .providerType(AuthProviderType.EMAIL)
                        .profileCompleted("100")
                        .build();
                students.add(student);
            }
            userRepository.saveAll(students);

            // Create 5 events
            List<Event> events = new ArrayList<>();
            for (int i = 1; i <= 5; i++) {
                Event event = Event.builder()
                        .Title("Event " + i)
                        .description("Description for event " + i)
                        .startAt(LocalDateTime.now().plusDays(i))
                        .endAt(LocalDateTime.now().plusDays(i).plusHours(2))
                        .location("Location " + i)
                        .CreatedBy(manager)
                        .requiredVolunteer(10)
                        .status("Event Created")
                        .managedbyManager(true)
                        .category("Category " + i)
                        .tags("tag" + i)
                        .cost("0")
                        .build();

                events.add(event);
            }
            eventRepository.saveAll(events);

            // Register 10 students per event
            List<StudentEventRegister> registrations = new ArrayList<>();
            int studentIndex = 0;
            for (Event event : events) {
                for (int j = 0; j < 10; j++) {
                    User student = students.get(studentIndex++);
                    StudentEventRegister reg = StudentEventRegister.builder()
                            .event(event)
                            .user(student)
                            .prevExp("No previous experience")
                            .reasonforevent("Wants to participate in " + event.getTitle())
                            .skills("Teamwork, Communication")
                            .notes("Excited to join")
                            .availability("Full-time")
                            .haveBike("No")
                            .transportMedium("Bus")
                            .dietaryRestrictions("None")
                            .status("PENDING")
                            .build();
                    registrations.add(reg);
                }
            }
            studentEventRegisterRepository.saveAll(registrations);

            System.out.println("✅ 50 students, 5 events, and registrations created!");
        }
    }
}
