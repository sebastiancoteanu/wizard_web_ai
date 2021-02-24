package com.sebastiancoteanu.teachers_uix.service.mapper;


import com.sebastiancoteanu.teachers_uix.domain.*;
import com.sebastiancoteanu.teachers_uix.service.dto.AppUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppUser} and its DTO {@link AppUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, WebsiteMapper.class})
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUser> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "website.id", target = "websiteId")
    AppUserDTO toDto(AppUser appUser);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "websiteId", target = "website")
    AppUser toEntity(AppUserDTO appUserDTO);

    default AppUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        AppUser appUser = new AppUser();
        appUser.setId(id);
        return appUser;
    }
}
