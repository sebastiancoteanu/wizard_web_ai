package com.sebastiancoteanu.teachers_uix.service.mapper;


import com.sebastiancoteanu.teachers_uix.domain.*;
import com.sebastiancoteanu.teachers_uix.service.dto.PageDraftDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PageDraft} and its DTO {@link PageDraftDTO}.
 */
@Mapper(componentModel = "spring", uses = {PageMapper.class})
public interface PageDraftMapper extends EntityMapper<PageDraftDTO, PageDraft> {

    @Mapping(source = "page.id", target = "pageId")
    PageDraftDTO toDto(PageDraft pageDraft);

    @Mapping(target = "blocks", ignore = true)
    @Mapping(target = "removeBlocks", ignore = true)
    @Mapping(source = "pageId", target = "page")
    PageDraft toEntity(PageDraftDTO pageDraftDTO);

    default PageDraft fromId(Long id) {
        if (id == null) {
            return null;
        }
        PageDraft pageDraft = new PageDraft();
        pageDraft.setId(id);
        return pageDraft;
    }
}
