package com.sebastiancoteanu.teachers_uix.service;

import com.sebastiancoteanu.teachers_uix.service.dto.PageDraftDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sebastiancoteanu.teachers_uix.domain.PageDraft}.
 */
public interface PageDraftService {

    /**
     * Save a pageDraft.
     *
     * @param pageDraftDTO the entity to save.
     * @return the persisted entity.
     */
    PageDraftDTO save(PageDraftDTO pageDraftDTO);

    /**
     * Get all the pageDrafts.
     *
     * @return the list of entities.
     */
    List<PageDraftDTO> findAll();


    /**
     * Get the "id" pageDraft.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PageDraftDTO> findOne(Long id);

    /**
     * Delete the "id" pageDraft.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
