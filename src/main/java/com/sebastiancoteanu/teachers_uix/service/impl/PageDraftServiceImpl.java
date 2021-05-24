package com.sebastiancoteanu.teachers_uix.service.impl;

import com.sebastiancoteanu.teachers_uix.domain.Page;
import com.sebastiancoteanu.teachers_uix.domain.User;
import com.sebastiancoteanu.teachers_uix.repository.PageRepository;
import com.sebastiancoteanu.teachers_uix.service.PageDraftService;
import com.sebastiancoteanu.teachers_uix.domain.PageDraft;
import com.sebastiancoteanu.teachers_uix.repository.PageDraftRepository;
import com.sebastiancoteanu.teachers_uix.service.dto.PageDraftDTO;
import com.sebastiancoteanu.teachers_uix.service.mapper.PageDraftMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PageDraft}.
 */
@Service
@Transactional
public class PageDraftServiceImpl implements PageDraftService {

    private final Logger log = LoggerFactory.getLogger(PageDraftServiceImpl.class);

    private final PageDraftRepository pageDraftRepository;

    private final PageRepository pageRepository;

    private final PageDraftMapper pageDraftMapper;

    public PageDraftServiceImpl(PageDraftRepository pageDraftRepository, PageRepository pageRepository, PageDraftMapper pageDraftMapper) {
        this.pageDraftRepository = pageDraftRepository;
        this.pageRepository = pageRepository;
        this.pageDraftMapper = pageDraftMapper;
    }

    @Override
    public PageDraftDTO save(PageDraftDTO pageDraftDTO) {
        log.debug("Request to save PageDraft : {}", pageDraftDTO);
        PageDraft pageDraft = pageDraftMapper.toEntity(pageDraftDTO);
        pageDraft = pageDraftRepository.save(pageDraft);
        return pageDraftMapper.toDto(pageDraft);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PageDraftDTO> findAll() {
        log.debug("Request to get all PageDrafts");
        return pageDraftRepository.findAll().stream()
            .map(pageDraftMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<List<PageDraftDTO>> findByPageId(Long id) {
        Optional<Page> page = pageRepository.findById(id);
        return pageDraftRepository.findByPage(page.get()).map(pageDraftMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PageDraftDTO> findOne(Long id) {
        log.debug("Request to get PageDraft : {}", id);
        return pageDraftRepository.findById(id)
            .map(pageDraftMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PageDraft : {}", id);
        pageDraftRepository.deleteById(id);
    }
}
