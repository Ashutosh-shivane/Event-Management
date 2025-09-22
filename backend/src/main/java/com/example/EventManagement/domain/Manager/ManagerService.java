package com.example.EventManagement.domain.Manager;

import com.example.EventManagement.domain.entity.User;
import com.example.EventManagement.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;
    private final UserRepository userRepository;

    @Autowired
    private  ModelMapper modelMapper;

    public ManagerOutDto getProfileData(Long userid) {
        User user=userRepository.findById(userid).orElseThrow();

        Manager manager=managerRepository.findByUserId(userid);

        if(manager==null){
            ManagerOutDto temp=new ManagerOutDto();
            temp.setEmail(user.getUsername());
            temp.setName(user.getName());

            return temp;
        }

        ManagerOutDto data=modelMapper.map(manager,ManagerOutDto.class);

        data.setEmail(user.getUsername());
        data.setName(user.getName());

        return data;

    }

    public ManagerOutDto saveProfileData(ManagerInDto managerInDto) {

        Manager manager=modelMapper.map(managerInDto,Manager.class);

        User user=userRepository.findById(managerInDto.getUserid()).orElseThrow();

        Manager ExistingMangaer=managerRepository.findByUserId(user.getId());



        if(ExistingMangaer==null){
            manager.setUser(user);
            Manager saveduser=managerRepository.save(manager);

            return modelMapper.map(saveduser,ManagerOutDto.class);

        }else{

            // Update existing manager profile
            modelMapper.map(managerInDto, ExistingMangaer); // copy new fields into existing entity
            ExistingMangaer.setUser(user);
            Manager updatedManager = managerRepository.save(ExistingMangaer);
            return modelMapper.map(updatedManager, ManagerOutDto.class);
        }


    }
}
