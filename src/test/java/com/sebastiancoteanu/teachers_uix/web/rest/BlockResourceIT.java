package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.TeachersUixApp;
import com.sebastiancoteanu.teachers_uix.domain.Block;
import com.sebastiancoteanu.teachers_uix.repository.BlockRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sebastiancoteanu.teachers_uix.domain.enumeration.BlockType;
/**
 * Integration tests for the {@link BlockResource} REST controller.
 */
@SpringBootTest(classes = TeachersUixApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BlockResourceIT {

    private static final BlockType DEFAULT_TYPE = BlockType.PARAGRAPH;
    private static final BlockType UPDATED_TYPE = BlockType.HEADER;

    private static final String DEFAULT_OPTIONS = "AAAAAAAAAA";
    private static final String UPDATED_OPTIONS = "BBBBBBBBBB";

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBlockMockMvc;

    private Block block;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Block createEntity(EntityManager em) {
        Block block = new Block()
            .type(DEFAULT_TYPE)
            .options(DEFAULT_OPTIONS);
        return block;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Block createUpdatedEntity(EntityManager em) {
        Block block = new Block()
            .type(UPDATED_TYPE)
            .options(UPDATED_OPTIONS);
        return block;
    }

    @BeforeEach
    public void initTest() {
        block = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlock() throws Exception {
        int databaseSizeBeforeCreate = blockRepository.findAll().size();
        // Create the Block
        restBlockMockMvc.perform(post("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(block)))
            .andExpect(status().isCreated());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeCreate + 1);
        Block testBlock = blockList.get(blockList.size() - 1);
        assertThat(testBlock.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBlock.getOptions()).isEqualTo(DEFAULT_OPTIONS);
    }

    @Test
    @Transactional
    public void createBlockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blockRepository.findAll().size();

        // Create the Block with an existing ID
        block.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlockMockMvc.perform(post("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(block)))
            .andExpect(status().isBadRequest());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = blockRepository.findAll().size();
        // set the field null
        block.setType(null);

        // Create the Block, which fails.


        restBlockMockMvc.perform(post("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(block)))
            .andExpect(status().isBadRequest());

        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBlocks() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);

        // Get all the blockList
        restBlockMockMvc.perform(get("/api/blocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(block.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].options").value(hasItem(DEFAULT_OPTIONS)));
    }
    
    @Test
    @Transactional
    public void getBlock() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);

        // Get the block
        restBlockMockMvc.perform(get("/api/blocks/{id}", block.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(block.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.options").value(DEFAULT_OPTIONS));
    }
    @Test
    @Transactional
    public void getNonExistingBlock() throws Exception {
        // Get the block
        restBlockMockMvc.perform(get("/api/blocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlock() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);

        int databaseSizeBeforeUpdate = blockRepository.findAll().size();

        // Update the block
        Block updatedBlock = blockRepository.findById(block.getId()).get();
        // Disconnect from session so that the updates on updatedBlock are not directly saved in db
        em.detach(updatedBlock);
        updatedBlock
            .type(UPDATED_TYPE)
            .options(UPDATED_OPTIONS);

        restBlockMockMvc.perform(put("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBlock)))
            .andExpect(status().isOk());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeUpdate);
        Block testBlock = blockList.get(blockList.size() - 1);
        assertThat(testBlock.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBlock.getOptions()).isEqualTo(UPDATED_OPTIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingBlock() throws Exception {
        int databaseSizeBeforeUpdate = blockRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlockMockMvc.perform(put("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(block)))
            .andExpect(status().isBadRequest());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBlock() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);

        int databaseSizeBeforeDelete = blockRepository.findAll().size();

        // Delete the block
        restBlockMockMvc.perform(delete("/api/blocks/{id}", block.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
