package com.sebastiancoteanu.teachers_uix.service;

import com.sebastiancoteanu.teachers_uix.service.dto.AppUserDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sebastiancoteanu.teachers_uix.domain.AppUser}.
 */
public interface AppUserService {

    /**
     * Save a appUser.
     *
     * @param appUserDTO the entity to save.
     * @return the persisted entity.
     */
    AppUserDTO save(AppUserDTO appUserDTO);

    /**
     * Get all the appUsers.
     *
     * @return the list of entities.
     */
    List<AppUserDTO> findAll();


    /**
     * Get the "id" appUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppUserDTO> findOne(Long id);

    Optional<AppUserDTO> findOneByUserId(Long id);

    /**
     * Delete the "id" appUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
