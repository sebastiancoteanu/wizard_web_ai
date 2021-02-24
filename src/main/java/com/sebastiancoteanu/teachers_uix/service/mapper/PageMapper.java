package com.sebastiancoteanu.teachers_uix.service.mapper;


import com.sebastiancoteanu.teachers_uix.domain.*;
import com.sebastiancoteanu.teachers_uix.service.dto.PageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Page} and its DTO {@link PageDTO}.
 */
@Mapper(componentModel = "spring", uses = {WebsiteMapper.class})
public interface PageMapper extends EntityMapper<PageDTO, Page> {

    @Mapping(source = "website.id", target = "websiteId")
    PageDTO toDto(Page page);

    @Mapping(target = "drafts", ignore = true)
    @Mapping(target = "removeDrafts", ignore = true)
    @Mapping(source = "websiteId", target = "website")
    Page toEntity(PageDTO pageDTO);

    default Page fromId(Long id) {
        if (id == null) {
            return null;
        }
        Page page = new Page();
        page.setId(id);
        return page;
    }
}
