package com.sebastiancoteanu.teachers_uix.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.List;

import com.sebastiancoteanu.teachers_uix.domain.enumeration.ThemeType;

/**
 * A DTO for the {@link com.sebastiancoteanu.teachers_uix.domain.Website} entity.
 */
public class WebsiteDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String url;

    @NotNull
    private ThemeType theme;

    private Long creatorId;

    private List<PageDTO> pages;

    public List<PageDTO> getPages() {
        return pages;
    }

    public void setPages(List<PageDTO> pages) {
        this.pages = pages;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ThemeType getTheme() {
        return theme;
    }

    public void setTheme(ThemeType theme) {
        this.theme = theme;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WebsiteDTO)) {
            return false;
        }

        return id != null && id.equals(((WebsiteDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WebsiteDTO{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", theme='" + getTheme() + "'" +
            "}";
    }
}
