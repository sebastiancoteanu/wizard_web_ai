package com.sebastiancoteanu.teachers_uix.service.impl;

import com.sebastiancoteanu.teachers_uix.domain.*;
import com.sebastiancoteanu.teachers_uix.repository.PageDraftRepository;
import com.sebastiancoteanu.teachers_uix.repository.WebsiteRepository;
import com.sebastiancoteanu.teachers_uix.service.PageService;
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

    private final PageDraftRepository pageDraftRepository;

    private final PageMapper pageMapper;

    private final WebsiteRepository websiteRepository;

    public PageServiceImpl(PageRepository pageRepository, PageDraftRepository pageDraftRepository, PageMapper pageMapper, WebsiteRepository websiteRepository) {
        this.pageRepository = pageRepository;
        this.pageDraftRepository = pageDraftRepository;
        this.pageMapper = pageMapper;
        this.websiteRepository = websiteRepository;
    }

    @Override
    public PageDTO save(PageDTO pageDTO) {
        log.debug("Request to save Page : {}", pageDTO);
        Page page = pageMapper.toEntity(pageDTO);
        page = pageRepository.save(page);

        /* Create page draft and automatically select it */
        if (page.getSelectedPageDraftId() == null) {
            PageDraft pageDraft = new PageDraft();
            pageDraft.setPage(page);
            pageDraft = pageDraftRepository.save(pageDraft);
            page.setSelectedPageDraftId(pageDraft.getId());
            page = pageRepository.save(page);
        }

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
  public Optional<List<PageDTO>> findAllByWebsiteUrl(String url) {
    Optional<Website> website = websiteRepository.findByUrl(url);

    if (website.isPresent()) {
      Optional<List<Page>> pages = pageRepository.findByWebsiteId(website.get().getId());

      if(pages.isPresent()) {
        return Optional.of(pages.get().stream()
          .map(pageMapper::toDto).collect(Collectors.toCollection(ArrayList::new)));
      }
    }

    return Optional.empty();
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
