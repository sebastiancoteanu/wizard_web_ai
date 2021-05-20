package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.domain.AppUser;
import com.sebastiancoteanu.teachers_uix.service.AppUserService;
import com.sebastiancoteanu.teachers_uix.service.WebsiteService;
import com.sebastiancoteanu.teachers_uix.service.dto.AppUserDTO;
import com.sebastiancoteanu.teachers_uix.web.rest.errors.BadRequestAlertException;
import com.sebastiancoteanu.teachers_uix.service.dto.WebsiteDTO;

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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sebastiancoteanu.teachers_uix.domain.Website}.
 */
@RestController
@RequestMapping("/api")
public class WebsiteResource {

    private final Logger log = LoggerFactory.getLogger(WebsiteResource.class);

    private static final String ENTITY_NAME = "website";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WebsiteService websiteService;

    private final AppUserService appUserService;

    public WebsiteResource(WebsiteService websiteService, AppUserService appUserService) {
        this.websiteService = websiteService;
        this.appUserService = appUserService;
    }

    /**
     * {@code POST  /websites} : Create a new website.
     *
     * @param websiteDTO the websiteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new websiteDTO, or with status {@code 400 (Bad Request)} if the website has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/websites")
    public ResponseEntity<WebsiteDTO> createWebsite(@Valid @RequestBody WebsiteDTO websiteDTO) throws URISyntaxException {
        log.debug("REST request to save Website : {}", websiteDTO);
        if (websiteDTO.getId() != null) {
            throw new BadRequestAlertException("A new website cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WebsiteDTO result = websiteService.save(websiteDTO);

        if (result.getCreatorId() != null) {
            Optional<AppUserDTO> appUser = appUserService.findOne(result.getCreatorId());
            appUser.ifPresent(appUserDTO -> appUserDTO.setWebsiteId(result.getId()));
            appUser.ifPresent(appUserService::save);
        }

        return ResponseEntity.created(new URI("/api/websites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /websites} : Updates an existing website.
     *
     * @param websiteDTO the websiteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated websiteDTO,
     * or with status {@code 400 (Bad Request)} if the websiteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the websiteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/websites")
    public ResponseEntity<WebsiteDTO> updateWebsite(@Valid @RequestBody WebsiteDTO websiteDTO) throws URISyntaxException {
        log.debug("REST request to update Website : {}", websiteDTO);
        if (websiteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WebsiteDTO result = websiteService.save(websiteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, websiteDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /websites} : get all the websites.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of websites in body.
     */
    @GetMapping("/websites")
    public List<WebsiteDTO> getAllWebsites(@RequestParam(required = false) String filter) {
        if ("creator-is-null".equals(filter)) {
            log.debug("REST request to get all Websites where creator is null");
            return websiteService.findAllWhereCreatorIsNull();
        }
        log.debug("REST request to get all Websites");
        return websiteService.findAll();
    }

    /**
     * {@code GET  /websites/:id} : get the "id" website.
     *
     * @param id the id of the websiteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the websiteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/websites/{id}")
    public ResponseEntity<WebsiteDTO> getWebsite(@PathVariable Long id) {
        log.debug("REST request to get Website : {}", id);
        Optional<WebsiteDTO> websiteDTO = websiteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(websiteDTO);
    }

    /**
     * {@code DELETE  /websites/:id} : delete the "id" website.
     *
     * @param id the id of the websiteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/websites/{id}")
    public ResponseEntity<Void> deleteWebsite(@PathVariable Long id) {
        log.debug("REST request to delete Website : {}", id);
        websiteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
