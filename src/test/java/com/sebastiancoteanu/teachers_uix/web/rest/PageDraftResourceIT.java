package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.TeachersUixApp;
import com.sebastiancoteanu.teachers_uix.domain.PageDraft;
import com.sebastiancoteanu.teachers_uix.repository.PageDraftRepository;

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

/**
 * Integration tests for the {@link PageDraftResource} REST controller.
 */
@SpringBootTest(classes = TeachersUixApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PageDraftResourceIT {

    private static final Boolean DEFAULT_IS_PUBLISHED = false;
    private static final Boolean UPDATED_IS_PUBLISHED = true;

    @Autowired
    private PageDraftRepository pageDraftRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPageDraftMockMvc;

    private PageDraft pageDraft;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PageDraft createEntity(EntityManager em) {
        PageDraft pageDraft = new PageDraft()
            .isPublished(DEFAULT_IS_PUBLISHED);
        return pageDraft;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PageDraft createUpdatedEntity(EntityManager em) {
        PageDraft pageDraft = new PageDraft()
            .isPublished(UPDATED_IS_PUBLISHED);
        return pageDraft;
    }

    @BeforeEach
    public void initTest() {
        pageDraft = createEntity(em);
    }

    @Test
    @Transactional
    public void createPageDraft() throws Exception {
        int databaseSizeBeforeCreate = pageDraftRepository.findAll().size();
        // Create the PageDraft
        restPageDraftMockMvc.perform(post("/api/page-drafts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDraft)))
            .andExpect(status().isCreated());

        // Validate the PageDraft in the database
        List<PageDraft> pageDraftList = pageDraftRepository.findAll();
        assertThat(pageDraftList).hasSize(databaseSizeBeforeCreate + 1);
        PageDraft testPageDraft = pageDraftList.get(pageDraftList.size() - 1);
        assertThat(testPageDraft.isIsPublished()).isEqualTo(DEFAULT_IS_PUBLISHED);
    }

    @Test
    @Transactional
    public void createPageDraftWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pageDraftRepository.findAll().size();

        // Create the PageDraft with an existing ID
        pageDraft.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPageDraftMockMvc.perform(post("/api/page-drafts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDraft)))
            .andExpect(status().isBadRequest());

        // Validate the PageDraft in the database
        List<PageDraft> pageDraftList = pageDraftRepository.findAll();
        assertThat(pageDraftList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIsPublishedIsRequired() throws Exception {
        int databaseSizeBeforeTest = pageDraftRepository.findAll().size();
        // set the field null
        pageDraft.setIsPublished(null);

        // Create the PageDraft, which fails.


        restPageDraftMockMvc.perform(post("/api/page-drafts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDraft)))
            .andExpect(status().isBadRequest());

        List<PageDraft> pageDraftList = pageDraftRepository.findAll();
        assertThat(pageDraftList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPageDrafts() throws Exception {
        // Initialize the database
        pageDraftRepository.saveAndFlush(pageDraft);

        // Get all the pageDraftList
        restPageDraftMockMvc.perform(get("/api/page-drafts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pageDraft.getId().intValue())))
            .andExpect(jsonPath("$.[*].isPublished").value(hasItem(DEFAULT_IS_PUBLISHED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPageDraft() throws Exception {
        // Initialize the database
        pageDraftRepository.saveAndFlush(pageDraft);

        // Get the pageDraft
        restPageDraftMockMvc.perform(get("/api/page-drafts/{id}", pageDraft.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pageDraft.getId().intValue()))
            .andExpect(jsonPath("$.isPublished").value(DEFAULT_IS_PUBLISHED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPageDraft() throws Exception {
        // Get the pageDraft
        restPageDraftMockMvc.perform(get("/api/page-drafts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePageDraft() throws Exception {
        // Initialize the database
        pageDraftRepository.saveAndFlush(pageDraft);

        int databaseSizeBeforeUpdate = pageDraftRepository.findAll().size();

        // Update the pageDraft
        PageDraft updatedPageDraft = pageDraftRepository.findById(pageDraft.getId()).get();
        // Disconnect from session so that the updates on updatedPageDraft are not directly saved in db
        em.detach(updatedPageDraft);
        updatedPageDraft
            .isPublished(UPDATED_IS_PUBLISHED);

        restPageDraftMockMvc.perform(put("/api/page-drafts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPageDraft)))
            .andExpect(status().isOk());

        // Validate the PageDraft in the database
        List<PageDraft> pageDraftList = pageDraftRepository.findAll();
        assertThat(pageDraftList).hasSize(databaseSizeBeforeUpdate);
        PageDraft testPageDraft = pageDraftList.get(pageDraftList.size() - 1);
        assertThat(testPageDraft.isIsPublished()).isEqualTo(UPDATED_IS_PUBLISHED);
    }

    @Test
    @Transactional
    public void updateNonExistingPageDraft() throws Exception {
        int databaseSizeBeforeUpdate = pageDraftRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPageDraftMockMvc.perform(put("/api/page-drafts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDraft)))
            .andExpect(status().isBadRequest());

        // Validate the PageDraft in the database
        List<PageDraft> pageDraftList = pageDraftRepository.findAll();
        assertThat(pageDraftList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePageDraft() throws Exception {
        // Initialize the database
        pageDraftRepository.saveAndFlush(pageDraft);

        int databaseSizeBeforeDelete = pageDraftRepository.findAll().size();

        // Delete the pageDraft
        restPageDraftMockMvc.perform(delete("/api/page-drafts/{id}", pageDraft.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PageDraft> pageDraftList = pageDraftRepository.findAll();
        assertThat(pageDraftList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
