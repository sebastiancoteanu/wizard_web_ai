package com.sebastiancoteanu.teachers_uix.service.impl;

import com.sebastiancoteanu.teachers_uix.service.PageService;
import com.sebastiancoteanu.teachers_uix.domain.Page;
import com.sebastiancoteanu.teachers_uix.repository.PageRepository;
import com.sebastiancoteanu.teachers_uix.service.dto.PageDTO;
import com.sebastiancoteanu.teachers_uix.service.mapper.PageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Page}.
 */
@Service
@Transactional
public class PageServiceImpl implements PageService {

    private final Logger log = LoggerFactory.getLogger(PageServiceImpl.class);

    private final PageRepository pageRepository;

    private final PageMapper pageMapper;

    public PageServiceImpl(PageRepository pageRepository, PageMapper pageMapper) {
        this.pageRepository = pageRepository;
        this.pageMapper = pageMapper;
    }

    @Override
    public PageDTO save(PageDTO pageDTO) {
        log.debug("Request to save Page : {}", pageDTO);
        Page page = pageMapper.toEntity(pageDTO);
        page = pageRepository.save(page);
        return pageMapper.toDto(page);
    }

    @Override
    public List<PageDTO> saveAll(List<PageDTO> pagesDTO) {
        List pages = new ArrayList();
        for (PageDTO pageDTO : pagesDTO) {
            pages.add(pageMapper.toEntity(pageDTO));
        }
        pages = pageRepository.saveAll(pages);
        return pages;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PageDTO> findAll() {
        log.debug("Request to get all Pages");
        return pageRepository.findAll().stream()
            .map(pageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PageDTO> findOne(Long id) {
        log.debug("Request to get Page : {}", id);
        return pageRepository.findById(id)
            .map(pageMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Page : {}", id);
        pageRepository.deleteById(id);
    }
}
