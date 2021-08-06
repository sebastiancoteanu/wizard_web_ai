package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.service.BlockService;
import com.sebastiancoteanu.teachers_uix.service.dto.BlocksDTO;
import com.sebastiancoteanu.teachers_uix.service.dto.PageDTO;
import com.sebastiancoteanu.teachers_uix.service.dto.PagesDTO;
import com.sebastiancoteanu.teachers_uix.web.rest.errors.BadRequestAlertException;
import com.sebastiancoteanu.teachers_uix.service.dto.BlockDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link com.sebastiancoteanu.teachers_uix.domain.Block}.
 */
@RestController
@RequestMapping("/api")
public class BlockResource {

    private final Logger log = LoggerFactory.getLogger(BlockResource.class);

    private static final String ENTITY_NAME = "block";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BlockService blockService;

    public BlockResource(BlockService blockService) {
        this.blockService = blockService;
    }

    /**
     * {@code POST  /blocks} : Create a new block.
     *
     * @param blockDTO the blockDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blockDTO, or with status {@code 400 (Bad Request)} if the block has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blocks")
    public ResponseEntity<BlockDTO> createBlock(@Valid @RequestBody BlockDTO blockDTO) throws URISyntaxException {
        log.debug("REST request to save Block : {}", blockDTO);
        if (blockDTO.getId() != null) {
            throw new BadRequestAlertException("A new block cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlockDTO result = blockService.save(blockDTO);
        return ResponseEntity.created(new URI("/api/blocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blocks} : Updates an existing block.
     *
     * @param blockDTO the blockDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blockDTO,
     * or with status {@code 400 (Bad Request)} if the blockDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blockDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blocks")
    public ResponseEntity<BlockDTO> updateBlock(@Valid @RequestBody BlockDTO blockDTO) throws URISyntaxException {
        log.debug("REST request to update Block : {}", blockDTO);
        if (blockDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BlockDTO result = blockService.save(blockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, blockDTO.getId().toString()))
            .body(result);
    }

    @PutMapping("/blocks/all")
    public ResponseEntity<List<BlockDTO>> updateBlocks(@Valid @RequestBody BlocksDTO blocksDTO) throws URISyntaxException {
        List<BlockDTO> result = blockService.saveAll(blocksDTO.getList());
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code GET  /blocks} : get all the blocks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blocks in body.
     */
    @GetMapping("/blocks")
    public List<BlockDTO> getAllBlocks(@RequestParam(required = false, name = "pageDraftId") Long pageDraftId) {
        log.debug("REST request to get all Blocks based on pageDraftId");
        if (pageDraftId != null) {
            return blockService.findAll().stream().filter(pageDTO -> pageDTO.getPageDraftId() == pageDraftId).sorted(Comparator.comparingInt(BlockDTO::getOrder)).collect(Collectors.toList());
        }
        return blockService.findAll();
    }

    /**
     * {@code GET  /blocks/:id} : get the "id" block.
     *
     * @param id the id of the blockDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blockDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/blocks/{id}")
    public ResponseEntity<BlockDTO> getBlock(@PathVariable Long id) {
        log.debug("REST request to get Block : {}", id);
        Optional<BlockDTO> blockDTO = blockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(blockDTO);
    }

    /**
     * {@code DELETE  /blocks/:id} : delete the "id" block.
     *
     * @param id the id of the blockDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/blocks/{id}")
    public ResponseEntity<Void> deleteBlock(@PathVariable Long id) {
        log.debug("REST request to delete Block : {}", id);
        blockService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
