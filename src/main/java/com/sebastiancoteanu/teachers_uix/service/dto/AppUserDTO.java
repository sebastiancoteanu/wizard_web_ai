package com.sebastiancoteanu.teachers_uix.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.sebastiancoteanu.teachers_uix.domain.AppUser} entity.
 */
public class AppUserDTO implements Serializable {
    
    private Long id;


    private Long userId;

    private Long websiteId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getWebsiteId() {
        return websiteId;
    }

    public void setWebsiteId(Long websiteId) {
        this.websiteId = websiteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppUserDTO)) {
            return false;
        }

        return id != null && id.equals(((AppUserDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppUserDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", websiteId=" + getWebsiteId() +
            "}";
    }
}
