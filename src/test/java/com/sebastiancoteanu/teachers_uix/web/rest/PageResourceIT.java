package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.TeachersUixApp;
import com.sebastiancoteanu.teachers_uix.domain.Page;
import com.sebastiancoteanu.teachers_uix.repository.PageRepository;
import com.sebastiancoteanu.teachers_uix.service.PageService;
import com.sebastiancoteanu.teachers_uix.service.dto.PageDTO;
import com.sebastiancoteanu.teachers_uix.service.mapper.PageMapper;

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
 * Integration tests for the {@link PageResource} REST controller.
 */
@SpringBootTest(classes = TeachersUixApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PageResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_RESTRICTED = false;
    private static final Boolean UPDATED_IS_RESTRICTED = true;

    private static final Integer DEFAULT_ORDER = 1;
    private static final Integer UPDATED_ORDER = 2;

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private PageService pageService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPageMockMvc;

    private Page page;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Page createEntity(EntityManager em) {
        Page page = new Page()
            .url(DEFAULT_URL)
            .isRestricted(DEFAULT_IS_RESTRICTED)
            .order(DEFAULT_ORDER);
        return page;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Page createUpdatedEntity(EntityManager em) {
        Page page = new Page()
            .url(UPDATED_URL)
            .isRestricted(UPDATED_IS_RESTRICTED)
            .order(UPDATED_ORDER);
        return page;
    }

    @BeforeEach
    public void initTest() {
        page = createEntity(em);
    }

    @Test
    @Transactional
    public void createPage() throws Exception {
        int databaseSizeBeforeCreate = pageRepository.findAll().size();
        // Create the Page
        PageDTO pageDTO = pageMapper.toDto(page);
        restPageMockMvc.perform(post("/api/pages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isCreated());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeCreate + 1);
        Page testPage = pageList.get(pageList.size() - 1);
        assertThat(testPage.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testPage.isIsRestricted()).isEqualTo(DEFAULT_IS_RESTRICTED);
        assertThat(testPage.getOrder()).isEqualTo(DEFAULT_ORDER);
    }

    @Test
    @Transactional
    public void createPageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pageRepository.findAll().size();

        // Create the Page with an existing ID
        page.setId(1L);
        PageDTO pageDTO = pageMapper.toDto(page);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPageMockMvc.perform(post("/api/pages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = pageRepository.findAll().size();
        // set the field null
        page.setUrl(null);

        // Create the Page, which fails.
        PageDTO pageDTO = pageMapper.toDto(page);


        restPageMockMvc.perform(post("/api/pages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isBadRequest());

        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsRestrictedIsRequired() throws Exception {
        int databaseSizeBeforeTest = pageRepository.findAll().size();
        // set the field null
        page.setIsRestricted(null);

        // Create the Page, which fails.
        PageDTO pageDTO = pageMapper.toDto(page);


        restPageMockMvc.perform(post("/api/pages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isBadRequest());

        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPages() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);

        // Get all the pageList
        restPageMockMvc.perform(get("/api/pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(page.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].isRestricted").value(hasItem(DEFAULT_IS_RESTRICTED.booleanValue())))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER)));
    }
    
    @Test
    @Transactional
    public void getPage() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);

        // Get the page
        restPageMockMvc.perform(get("/api/pages/{id}", page.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(page.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.isRestricted").value(DEFAULT_IS_RESTRICTED.booleanValue()))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER));
    }
    @Test
    @Transactional
    public void getNonExistingPage() throws Exception {
        // Get the page
        restPageMockMvc.perform(get("/api/pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePage() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);

        int databaseSizeBeforeUpdate = pageRepository.findAll().size();

        // Update the page
        Page updatedPage = pageRepository.findById(page.getId()).get();
        // Disconnect from session so that the updates on updatedPage are not directly saved in db
        em.detach(updatedPage);
        updatedPage
            .url(UPDATED_URL)
            .isRestricted(UPDATED_IS_RESTRICTED)
            .order(UPDATED_ORDER);
        PageDTO pageDTO = pageMapper.toDto(updatedPage);

        restPageMockMvc.perform(put("/api/pages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isOk());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeUpdate);
        Page testPage = pageList.get(pageList.size() - 1);
        assertThat(testPage.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testPage.isIsRestricted()).isEqualTo(UPDATED_IS_RESTRICTED);
        assertThat(testPage.getOrder()).isEqualTo(UPDATED_ORDER);
    }

    @Test
    @Transactional
    public void updateNonExistingPage() throws Exception {
        int databaseSizeBeforeUpdate = pageRepository.findAll().size();

        // Create the Page
        PageDTO pageDTO = pageMapper.toDto(page);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPageMockMvc.perform(put("/api/pages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePage() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);

        int databaseSizeBeforeDelete = pageRepository.findAll().size();

        // Delete the page
        restPageMockMvc.perform(delete("/api/pages/{id}", page.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
