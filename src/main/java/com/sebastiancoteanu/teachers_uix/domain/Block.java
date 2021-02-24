package com.sebastiancoteanu.teachers_uix.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.sebastiancoteanu.teachers_uix.domain.enumeration.BlockType;

/**
 * A Block.
 */
@Entity
@Table(name = "block")
public class Block implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private BlockType type;

    @Size(max = 2000)
    @Column(name = "options", length = 2000)
    private String options;

    @ManyToOne
    @JsonIgnoreProperties(value = "blocks", allowSetters = true)
    private PageDraft pageDraft;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BlockType getType() {
        return type;
    }

    public Block type(BlockType type) {
        this.type = type;
        return this;
    }

    public void setType(BlockType type) {
        this.type = type;
    }

    public String getOptions() {
        return options;
    }

    public Block options(String options) {
        this.options = options;
        return this;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public PageDraft getPageDraft() {
        return pageDraft;
    }

    public Block pageDraft(PageDraft pageDraft) {
        this.pageDraft = pageDraft;
        return this;
    }

    public void setPageDraft(PageDraft pageDraft) {
        this.pageDraft = pageDraft;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Block)) {
            return false;
        }
        return id != null && id.equals(((Block) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Block{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", options='" + getOptions() + "'" +
            "}";
    }
}
