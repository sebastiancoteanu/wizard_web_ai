package com.sebastiancoteanu.teachers_uix.service;

import com.sebastiancoteanu.teachers_uix.service.dto.BlockDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sebastiancoteanu.teachers_uix.domain.Block}.
 */
public interface BlockService {

    /**
     * Save a block.
     *
     * @param blockDTO the entity to save.
     * @return the persisted entity.
     */
    BlockDTO save(BlockDTO blockDTO);

    /**
     * Get all the blocks.
     *
     * @return the list of entities.
     */
    List<BlockDTO> findAll();


    /**
     * Get the "id" block.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BlockDTO> findOne(Long id);

    /**
     * Delete the "id" block.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
