package com.sebastiancoteanu.teachers_uix.service.impl;

import com.sebastiancoteanu.teachers_uix.service.WebsiteService;
import com.sebastiancoteanu.teachers_uix.domain.Website;
import com.sebastiancoteanu.teachers_uix.repository.WebsiteRepository;
import com.sebastiancoteanu.teachers_uix.service.dto.WebsiteDTO;
import com.sebastiancoteanu.teachers_uix.service.mapper.WebsiteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Website}.
 */
@Service
@Transactional
public class WebsiteServiceImpl implements WebsiteService {

    private final Logger log = LoggerFactory.getLogger(WebsiteServiceImpl.class);

    private final WebsiteRepository websiteRepository;

    private final WebsiteMapper websiteMapper;

    public WebsiteServiceImpl(WebsiteRepository websiteRepository, WebsiteMapper websiteMapper) {
        this.websiteRepository = websiteRepository;
        this.websiteMapper = websiteMapper;
    }

    @Override
    public WebsiteDTO save(WebsiteDTO websiteDTO) {
        log.debug("Request to save Website : {}", websiteDTO);
        Website website = websiteMapper.toEntity(websiteDTO);
        website = websiteRepository.save(website);
        return websiteMapper.toDto(website);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WebsiteDTO> findAll() {
        log.debug("Request to get all Websites");
        return websiteRepository.findAll().stream()
            .map(websiteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }



    /**
     *  Get all the websites where Creator is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<WebsiteDTO> findAllWhereCreatorIsNull() {
        log.debug("Request to get all websites where Creator is null");
        return StreamSupport
            .stream(websiteRepository.findAll().spliterator(), false)
            .filter(website -> website.getCreator() == null)
            .map(websiteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WebsiteDTO> findOne(Long id) {
        log.debug("Request to get Website : {}", id);
        return websiteRepository.findById(id)
            .map(websiteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WebsiteDTO> findByUrl(String url) {
        log.debug("Request to get Website by url : {}", url);
        return websiteRepository.findByUrl(url)
          .map(websiteMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Website : {}", id);
        websiteRepository.deleteById(id);
    }
}
