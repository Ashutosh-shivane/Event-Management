package com.example.GreenRoute.domain.Student;

import com.example.GreenRoute.domain.entity.User;
import com.example.GreenRoute.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

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
}
