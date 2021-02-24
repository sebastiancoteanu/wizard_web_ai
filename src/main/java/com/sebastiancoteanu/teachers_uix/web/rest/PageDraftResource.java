package com.sebastiancoteanu.teachers_uix.web.rest;

import com.sebastiancoteanu.teachers_uix.domain.PageDraft;
import com.sebastiancoteanu.teachers_uix.repository.PageDraftRepository;
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

/**
 * REST controller for managing {@link com.sebastiancoteanu.teachers_uix.domain.PageDraft}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PageDraftResource {

    private final Logger log = LoggerFactory.getLogger(PageDraftResource.class);

    private static final String ENTITY_NAME = "pageDraft";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PageDraftRepository pageDraftRepository;

    public PageDraftResource(PageDraftRepository pageDraftRepository) {
        this.pageDraftRepository = pageDraftRepository;
    }

    /**
     * {@code POST  /page-drafts} : Create a new pageDraft.
     *
     * @param pageDraft the pageDraft to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pageDraft, or with status {@code 400 (Bad Request)} if the pageDraft has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/page-drafts")
    public ResponseEntity<PageDraft> createPageDraft(@Valid @RequestBody PageDraft pageDraft) throws URISyntaxException {
        log.debug("REST request to save PageDraft : {}", pageDraft);
        if (pageDraft.getId() != null) {
            throw new BadRequestAlertException("A new pageDraft cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PageDraft result = pageDraftRepository.save(pageDraft);
        return ResponseEntity.created(new URI("/api/page-drafts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /page-drafts} : Updates an existing pageDraft.
     *
     * @param pageDraft the pageDraft to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pageDraft,
     * or with status {@code 400 (Bad Request)} if the pageDraft is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pageDraft couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/page-drafts")
    public ResponseEntity<PageDraft> updatePageDraft(@Valid @RequestBody PageDraft pageDraft) throws URISyntaxException {
        log.debug("REST request to update PageDraft : {}", pageDraft);
        if (pageDraft.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PageDraft result = pageDraftRepository.save(pageDraft);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pageDraft.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /page-drafts} : get all the pageDrafts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pageDrafts in body.
     */
    @GetMapping("/page-drafts")
    public List<PageDraft> getAllPageDrafts() {
        log.debug("REST request to get all PageDrafts");
        return pageDraftRepository.findAll();
    }

    /**
     * {@code GET  /page-drafts/:id} : get the "id" pageDraft.
     *
     * @param id the id of the pageDraft to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pageDraft, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/page-drafts/{id}")
    public ResponseEntity<PageDraft> getPageDraft(@PathVariable Long id) {
        log.debug("REST request to get PageDraft : {}", id);
        Optional<PageDraft> pageDraft = pageDraftRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pageDraft);
    }

    /**
     * {@code DELETE  /page-drafts/:id} : delete the "id" pageDraft.
     *
     * @param id the id of the pageDraft to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/page-drafts/{id}")
    public ResponseEntity<Void> deletePageDraft(@PathVariable Long id) {
        log.debug("REST request to delete PageDraft : {}", id);
        pageDraftRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
