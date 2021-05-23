package com.sebastiancoteanu.teachers_uix.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.sebastiancoteanu.teachers_uix.domain.PageDraft} entity.
 */
public class PageDraftDTO implements Serializable {
    
    private Long id;


    private Long pageId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
            ", pageId=" + getPageId() +
            "}";
    }
}
