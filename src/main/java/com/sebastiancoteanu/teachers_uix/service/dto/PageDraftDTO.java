package com.sebastiancoteanu.teachers_uix.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.sebastiancoteanu.teachers_uix.domain.PageDraft} entity.
 */
public class PageDraftDTO implements Serializable {
    
    private Long id;

    @NotNull
    private Boolean isPublished;


    private Long pageId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }

    public Long getPageId() {
        return pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PageDraftDTO)) {
            return false;
        }

        return id != null && id.equals(((PageDraftDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PageDraftDTO{" +
            "id=" + getId() +
            ", isPublished='" + isIsPublished() + "'" +
            ", pageId=" + getPageId() +
            "}";
    }
}
