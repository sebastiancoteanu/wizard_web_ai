package com.sebastiancoteanu.teachers_uix.service;

import com.sebastiancoteanu.teachers_uix.service.dto.PageDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sebastiancoteanu.teachers_uix.domain.Page}.
 */
public interface PageService {

    /**
     * Save a page.
     *
     * @param pageDTO the entity to save.
     * @return the persisted entity.
     */
    PageDTO save(PageDTO pageDTO);

    List<PageDTO> saveAll(List<PageDTO> pages);

    /**
     * Get all the pages.
     *
     * @return the list of entities.
     */
    List<PageDTO> findAll();

    Optional<List<PageDTO>> findAllByWebsiteUrl(String url, Boolean isPublished);


    /**
     * Get the "id" page.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PageDTO> findOne(Long id);

    /**
     * Delete the "id" page.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
