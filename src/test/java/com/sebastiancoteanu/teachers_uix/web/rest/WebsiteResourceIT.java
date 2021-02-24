package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.TeachersUixApp;
import com.sebastiancoteanu.teachers_uix.domain.Website;
import com.sebastiancoteanu.teachers_uix.repository.WebsiteRepository;

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

import com.sebastiancoteanu.teachers_uix.domain.enumeration.ThemeType;
/**
 * Integration tests for the {@link WebsiteResource} REST controller.
 */
@SpringBootTest(classes = TeachersUixApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class WebsiteResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final ThemeType DEFAULT_THEME = ThemeType.LIGHT;
    private static final ThemeType UPDATED_THEME = ThemeType.DARK;

    @Autowired
    private WebsiteRepository websiteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWebsiteMockMvc;

    private Website website;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Website createEntity(EntityManager em) {
        Website website = new Website()
            .url(DEFAULT_URL)
            .theme(DEFAULT_THEME);
        return website;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Website createUpdatedEntity(EntityManager em) {
        Website website = new Website()
            .url(UPDATED_URL)
            .theme(UPDATED_THEME);
        return website;
    }

    @BeforeEach
    public void initTest() {
        website = createEntity(em);
    }

    @Test
    @Transactional
    public void createWebsite() throws Exception {
        int databaseSizeBeforeCreate = websiteRepository.findAll().size();
        // Create the Website
        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isCreated());

        // Validate the Website in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeCreate + 1);
        Website testWebsite = websiteList.get(websiteList.size() - 1);
        assertThat(testWebsite.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testWebsite.getTheme()).isEqualTo(DEFAULT_THEME);
    }

    @Test
    @Transactional
    public void createWebsiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = websiteRepository.findAll().size();

        // Create the Website with an existing ID
        website.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        // Validate the Website in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = websiteRepository.findAll().size();
        // set the field null
        website.setUrl(null);

        // Create the Website, which fails.


        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkThemeIsRequired() throws Exception {
        int databaseSizeBeforeTest = websiteRepository.findAll().size();
        // set the field null
        website.setTheme(null);

        // Create the Website, which fails.


        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWebsites() throws Exception {
        // Initialize the database
        websiteRepository.saveAndFlush(website);

        // Get all the websiteList
        restWebsiteMockMvc.perform(get("/api/websites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(website.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].theme").value(hasItem(DEFAULT_THEME.toString())));
    }
    
    @Test
    @Transactional
    public void getWebsite() throws Exception {
        // Initialize the database
        websiteRepository.saveAndFlush(website);

        // Get the website
        restWebsiteMockMvc.perform(get("/api/websites/{id}", website.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(website.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.theme").value(DEFAULT_THEME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWebsite() throws Exception {
        // Get the website
        restWebsiteMockMvc.perform(get("/api/websites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWebsite() throws Exception {
        // Initialize the database
        websiteRepository.saveAndFlush(website);

        int databaseSizeBeforeUpdate = websiteRepository.findAll().size();

        // Update the website
        Website updatedWebsite = websiteRepository.findById(website.getId()).get();
        // Disconnect from session so that the updates on updatedWebsite are not directly saved in db
        em.detach(updatedWebsite);
        updatedWebsite
            .url(UPDATED_URL)
            .theme(UPDATED_THEME);

        restWebsiteMockMvc.perform(put("/api/websites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedWebsite)))
            .andExpect(status().isOk());

        // Validate the Website in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeUpdate);
        Website testWebsite = websiteList.get(websiteList.size() - 1);
        assertThat(testWebsite.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testWebsite.getTheme()).isEqualTo(UPDATED_THEME);
    }

    @Test
    @Transactional
    public void updateNonExistingWebsite() throws Exception {
        int databaseSizeBeforeUpdate = websiteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWebsiteMockMvc.perform(put("/api/websites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        // Validate the Website in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWebsite() throws Exception {
        // Initialize the database
        websiteRepository.saveAndFlush(website);

        int databaseSizeBeforeDelete = websiteRepository.findAll().size();

        // Delete the website
        restWebsiteMockMvc.perform(delete("/api/websites/{id}", website.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
