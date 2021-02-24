package com.sebastiancoteanu.teachers_uix.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PageDraft.
 */
@Entity
@Table(name = "page_draft")
public class PageDraft implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "is_published", nullable = false)
    private Boolean isPublished;

    @OneToMany(mappedBy = "pageDraft")
    private Set<Block> blocks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "drafts", allowSetters = true)
    private Page page;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsPublished() {
        return isPublished;
    }

    public PageDraft isPublished(Boolean isPublished) {
        this.isPublished = isPublished;
        return this;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }

    public Set<Block> getBlocks() {
        return blocks;
    }

    public PageDraft blocks(Set<Block> blocks) {
        this.blocks = blocks;
        return this;
    }

    public PageDraft addBlocks(Block block) {
        this.blocks.add(block);
        block.setPageDraft(this);
        return this;
    }

    public PageDraft removeBlocks(Block block) {
        this.blocks.remove(block);
        block.setPageDraft(null);
        return this;
    }

    public void setBlocks(Set<Block> blocks) {
        this.blocks = blocks;
    }

    public Page getPage() {
        return page;
    }

    public PageDraft page(Page page) {
        this.page = page;
        return this;
    }

    public void setPage(Page page) {
        this.page = page;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PageDraft)) {
            return false;
        }
        return id != null && id.equals(((PageDraft) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PageDraft{" +
            "id=" + getId() +
            ", isPublished='" + isIsPublished() + "'" +
            "}";
    }
}
