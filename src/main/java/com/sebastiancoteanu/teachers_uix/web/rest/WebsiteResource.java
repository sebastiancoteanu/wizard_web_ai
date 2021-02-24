package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.domain.Website;
import com.sebastiancoteanu.teachers_uix.repository.WebsiteRepository;
import com.sebastiancoteanu.teachers_uix.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.sebastiancoteanu.teachers_uix.domain.Website}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WebsiteResource {

    private final Logger log = LoggerFactory.getLogger(WebsiteResource.class);

    private static final String ENTITY_NAME = "website";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WebsiteRepository websiteRepository;

    public WebsiteResource(WebsiteRepository websiteRepository) {
        this.websiteRepository = websiteRepository;
    }

    /**
     * {@code POST  /websites} : Create a new website.
     *
     * @param website the website to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new website, or with status {@code 400 (Bad Request)} if the website has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/websites")
    public ResponseEntity<Website> createWebsite(@Valid @RequestBody Website website) throws URISyntaxException {
        log.debug("REST request to save Website : {}", website);
        if (website.getId() != null) {
            throw new BadRequestAlertException("A new website cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Website result = websiteRepository.save(website);
        return ResponseEntity.created(new URI("/api/websites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /websites} : Updates an existing website.
     *
     * @param website the website to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated website,
     * or with status {@code 400 (Bad Request)} if the website is not valid,
     * or with status {@code 500 (Internal Server Error)} if the website couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/websites")
    public ResponseEntity<Website> updateWebsite(@Valid @RequestBody Website website) throws URISyntaxException {
        log.debug("REST request to update Website : {}", website);
        if (website.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Website result = websiteRepository.save(website);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, website.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /websites} : get all the websites.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of websites in body.
     */
    @GetMapping("/websites")
    public List<Website> getAllWebsites(@RequestParam(required = false) String filter) {
        if ("creator-is-null".equals(filter)) {
            log.debug("REST request to get all Websites where creator is null");
            return StreamSupport
                .stream(websiteRepository.findAll().spliterator(), false)
                .filter(website -> website.getCreator() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Websites");
        return websiteRepository.findAll();
    }

    /**
     * {@code GET  /websites/:id} : get the "id" website.
     *
     * @param id the id of the website to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the website, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/websites/{id}")
    public ResponseEntity<Website> getWebsite(@PathVariable Long id) {
        log.debug("REST request to get Website : {}", id);
        Optional<Website> website = websiteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(website);
    }

    /**
     * {@code DELETE  /websites/:id} : delete the "id" website.
     *
     * @param id the id of the website to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/websites/{id}")
    public ResponseEntity<Void> deleteWebsite(@PathVariable Long id) {
        log.debug("REST request to delete Website : {}", id);
        websiteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
