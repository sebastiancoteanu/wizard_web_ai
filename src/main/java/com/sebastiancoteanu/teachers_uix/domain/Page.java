package com.sebastiancoteanu.teachers_uix.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Page.
 */
@Entity
@Table(name = "page")
public class Page implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "url", nullable = false)
    private String url;

    @NotNull
    @Column(name = "is_restricted", nullable = false)
    private Boolean isRestricted;

    @Column(name = "jhi_order")
    private Integer order;

    @OneToMany(mappedBy = "page")
    private Set<PageDraft> drafts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "pages", allowSetters = true)
    private Website website;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Page url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean isIsRestricted() {
        return isRestricted;
    }

    public Page isRestricted(Boolean isRestricted) {
        this.isRestricted = isRestricted;
        return this;
    }

    public void setIsRestricted(Boolean isRestricted) {
        this.isRestricted = isRestricted;
    }

    public Integer getOrder() {
        return order;
    }

    public Page order(Integer order) {
        this.order = order;
        return this;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Set<PageDraft> getDrafts() {
        return drafts;
    }

    public Page drafts(Set<PageDraft> pageDrafts) {
        this.drafts = pageDrafts;
        return this;
    }

    public Page addDrafts(PageDraft pageDraft) {
        this.drafts.add(pageDraft);
        pageDraft.setPage(this);
        return this;
    }

    public Page removeDrafts(PageDraft pageDraft) {
        this.drafts.remove(pageDraft);
        pageDraft.setPage(null);
        return this;
    }

    public void setDrafts(Set<PageDraft> pageDrafts) {
        this.drafts = pageDrafts;
    }

    public Website getWebsite() {
        return website;
    }

    public Page website(Website website) {
        this.website = website;
        return this;
    }

    public void setWebsite(Website website) {
        this.website = website;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Page)) {
            return false;
        }
        return id != null && id.equals(((Page) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Page{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", isRestricted='" + isIsRestricted() + "'" +
            ", order=" + getOrder() +
            "}";
    }
}
