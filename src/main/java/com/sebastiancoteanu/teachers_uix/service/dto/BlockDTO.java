package com.sebastiancoteanu.teachers_uix.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import com.sebastiancoteanu.teachers_uix.domain.enumeration.BlockType;

/**
 * A DTO for the {@link com.sebastiancoteanu.teachers_uix.domain.Block} entity.
 */
public class BlockDTO implements Serializable {
    
    private Long id;

    @NotNull
    private BlockType type;

    @Size(max = 2000)
    private String options;


    private Long pageDraftId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BlockType getType() {
        return type;
    }

    public void setType(BlockType type) {
        this.type = type;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public Long getPageDraftId() {
        return pageDraftId;
    }

    public void setPageDraftId(Long pageDraftId) {
        this.pageDraftId = pageDraftId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BlockDTO)) {
            return false;
        }

        return id != null && id.equals(((BlockDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BlockDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", options='" + getOptions() + "'" +
            ", pageDraftId=" + getPageDraftId() +
            "}";
    }
}
