package com.example.GreenRoute.domain.Organizer;

import com.example.GreenRoute.domain.entity.User;
import com.example.GreenRoute.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizerService {

    private final UserRepository userRepository;

    private final OrganizerRepository organizerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public OrganizerOutDto getOrganizerProfile(Long userid) {

        User user=userRepository.findById(userid).orElseThrow();

        Organizer organizer=organizerRepository.findByUserId(userid);

        if(organizer==null){

            OrganizerOutDto temp=new OrganizerOutDto();

            temp.setEmail(user.getUsername());
            temp.setName(user.getName());

            return temp;

        }

        OrganizerOutDto data=modelMapper.map(organizer ,OrganizerOutDto.class);

        data.setEmail(user.getUsername());
        data.setName(user.getName());

        return data;
    }


    public Organizer convertToEntity(OrganizerInDto dto, User user) {
        Organizer organizer = new Organizer();

        organizer.setPhone(dto.getPhone());
        organizer.setBirthDate(dto.getBirthDate());
        organizer.setPersonalAddress(dto.getPersonalAddress());
        organizer.setPersonalCity(dto.getPersonalCity());
        organizer.setPersonalState(dto.getPersonalState());
        organizer.setPersonalZipcode(dto.getPersonalZipcode());
        organizer.setOrganizationBio(dto.getOrganizationBio());
        organizer.setOrganizationName(dto.getOrganizationName());
        organizer.setOrganizationType(dto.getOrganizationType());
        organizer.setIndustry(dto.getIndustry());
        organizer.setEstablishedYear(dto.getEstablishedYear());
        organizer.setWebsite(dto.getWebsite());
        organizer.setTeamSize(dto.getTeamSize());
        organizer.setBusinessAddress(dto.getBusinessAddress());
        organizer.setBusinessPhone(dto.getBusinessPhone());
        organizer.setBusinessEmail(dto.getBusinessEmail());
        organizer.setTaxId(dto.getTaxId());
        organizer.setBusinessModel(dto.getBusinessModel());
        organizer.setTargetAudience(dto.getTargetAudience());
        organizer.setAverageEventBudget(dto.getAverageEventBudget());
        organizer.setEmergencyContactName(dto.getEmergencyContactName());
        organizer.setEmergencyContactPhone(dto.getEmergencyContactPhone());
        organizer.setEmergencyContactRelation(dto.getEmergencyContactRelation());

        // set relation
        organizer.setUser(user);

        return organizer;
    }


    public OrganizerOutDto saveOrganizerProfile(OrganizerInDto dto) {
        // fetch User
        User user = userRepository.findById(dto.getUsertestid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // check if organizer already exists
        Organizer existingOrganizer = organizerRepository.findByUserId(user.getId());

        Organizer organizer;
        if (existingOrganizer == null) {
            // create new
            organizer = convertToEntity(dto, user);
        } else {
            // update existing
            organizer = convertToEntity(dto, user);
            organizer.setId(existingOrganizer.getId()); // preserve existing ID
        }

        Organizer saved = organizerRepository.save(organizer);

        return modelMapper.map(saved, OrganizerOutDto.class); // or map manually too
    }

}
