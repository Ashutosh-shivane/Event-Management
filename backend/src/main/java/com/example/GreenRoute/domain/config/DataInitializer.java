package com.example.GreenRoute.config;

import com.example.GreenRoute.domain.Event.Event;
import com.example.GreenRoute.domain.entity.User;
import com.example.GreenRoute.domain.entity.type.UserType;
import com.example.GreenRoute.domain.entity.type.AuthProviderType;
import com.example.GreenRoute.domain.Event.EventRepository;
import com.example.GreenRoute.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // Check if data already exists
        if(userRepository.count() == 0){
            // Create users
            User student = User.builder()
                    .username("s@gmail.com")
                    .name("Student One")
                    .password(passwordEncoder.encode("s")) // encode if using Spring Security
                    .usertype(UserType.STUDENT)
                    .providerType(AuthProviderType.EMAIL)
                    .build();

            User manager = User.builder()
                    .username("m@gmail.com")
                    .name("Manager One")
                    .password(passwordEncoder.encode("m"))
                    .usertype(UserType.MANAGER)
                    .providerType(AuthProviderType.EMAIL)
                    .build();

            User organizer = User.builder()
                    .username("o@gmail.com")
                    .name("Organizer One")
                    .password(passwordEncoder.encode("o"))
                    .usertype(UserType.ORGANIZER)
                    .providerType(AuthProviderType.EMAIL)
                    .build();

            userRepository.save(student);
            userRepository.save(manager);
            userRepository.save(organizer);

            // Create 5 events
            for(int i = 1; i <= 5; i++){
                Event event = Event.builder()
                        .Title("Event " + i)
                        .description("Description for event " + i)
                        .startAt(LocalDateTime.now().plusDays(i))
                        .endAt(LocalDateTime.now().plusDays(i).plusHours(2))
                        .location("Location " + i)
                        .CreatedBy(manager) // set manager as creator
                        .requiredVolunteer(10)
                        .status("Event Created")
                        .managedbyManager(true)
                        .category("Category " + i)
                        .tags("tag" + i)
                        .cost("0")
                        .build();

                eventRepository.save(event);
            }

            System.out.println("✅ Default users and events created!");
        }
    }
}
