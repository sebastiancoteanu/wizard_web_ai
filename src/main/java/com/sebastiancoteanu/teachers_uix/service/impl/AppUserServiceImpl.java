package com.sebastiancoteanu.teachers_uix.service.impl;

import com.sebastiancoteanu.teachers_uix.domain.User;
import com.sebastiancoteanu.teachers_uix.repository.UserRepository;
import com.sebastiancoteanu.teachers_uix.service.AppUserService;
import com.sebastiancoteanu.teachers_uix.domain.AppUser;
import com.sebastiancoteanu.teachers_uix.repository.AppUserRepository;
import com.sebastiancoteanu.teachers_uix.service.dto.AppUserDTO;
import com.sebastiancoteanu.teachers_uix.service.dto.UserDTO;
import com.sebastiancoteanu.teachers_uix.service.mapper.AppUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link AppUser}.
 */
@Service
@Transactional
public class AppUserServiceImpl implements AppUserService {

    private final Logger log = LoggerFactory.getLogger(AppUserServiceImpl.class);

    private final AppUserRepository appUserRepository;
    private final UserRepository userRepository;

    private final AppUserMapper appUserMapper;

    public AppUserServiceImpl(AppUserRepository appUserRepository, UserRepository userRepository, AppUserMapper appUserMapper) {
        this.appUserRepository = appUserRepository;
        this.userRepository = userRepository;
        this.appUserMapper = appUserMapper;
    }

    @Override
    public AppUserDTO save(AppUserDTO appUserDTO) {
        log.debug("Request to save AppUser : {}", appUserDTO);
        AppUser appUser = appUserMapper.toEntity(appUserDTO);
        appUser = appUserRepository.save(appUser);
        return appUserMapper.toDto(appUser);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppUserDTO> findAll() {
        log.debug("Request to get all AppUsers");
        return appUserRepository.findAll().stream()
            .map(appUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<AppUserDTO> findOne(Long id) {
        log.debug("Request to get AppUser : {}", id);
        return appUserRepository.findById(id)
            .map(appUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppUserDTO> findOneByUserId(Long id) {
        Optional<User> user = userRepository.findById(id);
        return appUserRepository.findOneByUser(user.get()).map(appUserMapper::toDto);
    }


    @Override
    public void delete(Long id) {
        log.debug("Request to delete AppUser : {}", id);
        appUserRepository.deleteById(id);
    }
}
