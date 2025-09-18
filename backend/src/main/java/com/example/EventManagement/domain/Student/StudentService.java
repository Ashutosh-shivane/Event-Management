package com.example.EventManagement.domain.Student;

import com.example.EventManagement.domain.Event.Event;
import com.example.EventManagement.domain.Event.EventRepository;
import com.example.EventManagement.domain.entity.User;
import com.example.EventManagement.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final StudentEventRegisterRepository studentEventRegisterRepository;

    private final EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;


    public StudentOutDto getprofile(Long userid) {

        User user=userRepository.findById(userid).orElseThrow();

        Student student=studentRepository.findByUserId(userid);



        if (student == null) {
            // return an empty StudentOutDto
            StudentOutDto temp=new StudentOutDto();
            temp.setEmail(user.getUsername());
            temp.setName(user.getName());

            return temp;


        }

        StudentOutDto data=modelMapper.map(student,StudentOutDto.class);

        data.setEmail(user.getUsername());
        data.setName(user.getName());

        return data;



    }

    public StudentOutDto saveProfile(StudentInDto studentInDto) {

        Student student=modelMapper.map(studentInDto,Student.class);

        User user=userRepository.findById(Long.parseLong(studentInDto.getUserid())).orElseThrow();

        user.setProfileCompleted(studentInDto.getProfileCompleted());
        userRepository.save(user);

        Student existingStudent =studentRepository.findByUserId(user.getId());



        if(existingStudent ==null){

            student.setUser(user);
            Student saved = studentRepository.save(student);
            return modelMapper.map(saved, StudentOutDto.class);



        }else{
            existingStudent.setPhone(student.getPhone());
            existingStudent.setBirthdate(student.getBirthdate());
            existingStudent.setAddress(student.getAddress());
            existingStudent.setCity(student.getCity());
            existingStudent.setState(student.getState());
            existingStudent.setZipcode(student.getZipcode());
            existingStudent.setUniversity(student.getUniversity());
            existingStudent.setCollege(student.getCollege());
            existingStudent.setDegree(student.getDegree());
            existingStudent.setMajor(student.getMajor());
            existingStudent.setGraduationYear(student.getGraduationYear());
            existingStudent.setCurrentYear(student.getCurrentYear());
            existingStudent.setMarks(student.getMarks());
            existingStudent.setBio(student.getBio());
            existingStudent.setInterests(student.getInterests());
            existingStudent.setSkills(student.getSkills());
            existingStudent.setLanguages(student.getLanguages());
            existingStudent.setEventtypes(student.getEventtypes());
            existingStudent.setAvailability(student.getAvailability());
            existingStudent.setVolunteerExperience(student.getVolunteerExperience());
            existingStudent.setEmergencyContactName(student.getEmergencyContactName());
            existingStudent.setEmergencyContactPhone(student.getEmergencyContactPhone());
            existingStudent.setEmergencyContactRelation(student.getEmergencyContactRelation());

            Student updated = studentRepository.save(existingStudent);
            return modelMapper.map(updated, StudentOutDto.class);
        }









    }

    public Map<String, Object> getprofilecompleted(Long userid,String eventid) {
        User user=userRepository.findById(userid).orElseThrow();

        Event event=eventRepository.findById(Long.parseLong(eventid)).orElseThrow();

        Optional<StudentEventRegister> existing = studentEventRegisterRepository.findByUserAndEvent(user, event);

        Map<String, Object> response = new HashMap<>();
        response.put("profileCompleted", user.getProfileCompleted());
        if (existing.isPresent()) {

            response.put("alreadyApplied", true);

        }
        else{
            response.put("alreadyApplied", false);
        }

        return response;


        
    }

    @Transactional
    public StudentEventRegisterOutDto registerForEvent(StudentEventRegisterInDto studentEventRegisterInDto) {

        StudentEventRegister studentEventRegister=modelMapper.map(studentEventRegisterInDto,StudentEventRegister.class);

        User user=userRepository.findById(Long.parseLong(  studentEventRegisterInDto.getUserid())).orElseThrow();

        Event event=eventRepository.findById(Long.parseLong(studentEventRegisterInDto.getEventid())).orElseThrow();


        Optional<StudentEventRegister> existing = studentEventRegisterRepository.findByUserAndEvent(user, event);

        StudentEventRegister savedRegister;
        if (existing.isPresent()) {
            // update existing registration
            StudentEventRegister existingRegister = existing.get();
            existingRegister.setPrevExp(studentEventRegister.getPrevExp());
            existingRegister.setReasonforevent(studentEventRegister.getReasonforevent());
            existingRegister.setSkills(studentEventRegister.getSkills());
            existingRegister.setNotes(studentEventRegister.getNotes());
            existingRegister.setAvailability(studentEventRegister.getAvailability());
            existingRegister.setHaveBike(studentEventRegister.getHaveBike());
            existingRegister.setTransportMedium(studentEventRegister.getTransportMedium());
            existingRegister.setDietaryRestrictions(studentEventRegister.getDietaryRestrictions());
            existingRegister.setStatus(studentEventRegister.getStatus());

            savedRegister = studentEventRegisterRepository.save(existingRegister);
        } else {
            // create new registration
            studentEventRegister.setUser(user);
            studentEventRegister.setEvent(event);
            savedRegister = studentEventRegisterRepository.save(studentEventRegister);
        }

        // convert back to OutDto
        return modelMapper.map(savedRegister, StudentEventRegisterOutDto.class);




    }
}
