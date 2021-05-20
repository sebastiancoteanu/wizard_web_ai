package com.sebastiancoteanu.teachers_uix.service.mapper;


import com.sebastiancoteanu.teachers_uix.domain.*;
import com.sebastiancoteanu.teachers_uix.service.dto.WebsiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Website} and its DTO {@link WebsiteDTO}.
 */
@Mapper(componentModel = "spring", uses = {AppUserMapper.class})
public interface WebsiteMapper extends EntityMapper<WebsiteDTO, Website> {


    @Mapping(target = "pages", ignore = true)
    @Mapping(target = "removePages", ignore = true)
    @Mapping(source = "creatorId", target = "creator")
    Website toEntity(WebsiteDTO websiteDTO);

    @Mapping(source = "creator.id", target = "creatorId")
    WebsiteDTO toDto(Website website);

    default Website fromId(Long id) {
        if (id == null) {
            return null;
        }
        Website website = new Website();
        website.setId(id);
        return website;
    }
}
