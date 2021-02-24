package com.sebastiancoteanu.teachers_uix.service.mapper;


import com.sebastiancoteanu.teachers_uix.domain.*;
import com.sebastiancoteanu.teachers_uix.service.dto.WebsiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Website} and its DTO {@link WebsiteDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WebsiteMapper extends EntityMapper<WebsiteDTO, Website> {


    @Mapping(target = "pages", ignore = true)
    @Mapping(target = "removePages", ignore = true)
    @Mapping(target = "creator", ignore = true)
    Website toEntity(WebsiteDTO websiteDTO);

    default Website fromId(Long id) {
        if (id == null) {
            return null;
        }
        Website website = new Website();
        website.setId(id);
        return website;
    }
}
