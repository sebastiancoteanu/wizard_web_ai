package com.sebastiancoteanu.teachers_uix.service;

import com.sebastiancoteanu.teachers_uix.service.dto.WebsiteDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sebastiancoteanu.teachers_uix.domain.Website}.
 */
public interface WebsiteService {

    /**
     * Save a website.
     *
     * @param websiteDTO the entity to save.
     * @return the persisted entity.
     */
    WebsiteDTO save(WebsiteDTO websiteDTO);

    /**
     * Get all the websites.
     *
     * @return the list of entities.
     */
    List<WebsiteDTO> findAll();
    /**
     * Get all the WebsiteDTO where Creator is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<WebsiteDTO> findAllWhereCreatorIsNull();


    /**
     * Get the "id" website.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WebsiteDTO> findOne(Long id);

    /**
     * Get the "url" website.
     *
     * @param url the url of the entity.
     * @return the entity.
     */
    Optional<WebsiteDTO> findByUrl(String url);

    /**
     * Delete the "id" website.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
