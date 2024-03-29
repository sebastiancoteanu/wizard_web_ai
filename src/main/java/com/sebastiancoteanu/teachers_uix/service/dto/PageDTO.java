package com.sebastiancoteanu.teachers_uix.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.sebastiancoteanu.teachers_uix.domain.Page} entity.
 */
public class PageDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String url;

    @NotNull
    private Boolean isRestricted;

    @NotNull
    private Boolean isPublished;

    private Integer order;

    private Long selectedPageDraftId;


    private Long websiteId;
    
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

    public Boolean isIsRestricted() {
        return isRestricted;
    }

    public void setIsRestricted(Boolean isRestricted) {
        this.isRestricted = isRestricted;
    }

    public Boolean isIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Long getSelectedPageDraftId() {
        return selectedPageDraftId;
    }

    public void setSelectedPageDraftId(Long selectedPageDraftId) {
        this.selectedPageDraftId = selectedPageDraftId;
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
        if (!(o instanceof PageDTO)) {
            return false;
        }

        return id != null && id.equals(((PageDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PageDTO{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", isRestricted='" + isIsRestricted() + "'" +
            ", isPublished='" + isIsPublished() + "'" +
            ", order=" + getOrder() +
            ", selectedPageDraftId=" + getSelectedPageDraftId() +
            ", websiteId=" + getWebsiteId() +
            "}";
    }
}
