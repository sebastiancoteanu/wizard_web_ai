package com.sebastiancoteanu.teachers_uix.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.sebastiancoteanu.teachers_uix.domain.enumeration.ThemeType;

/**
 * A Website.
 */
@Entity
@Table(name = "website")
public class Website implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "url", nullable = false)
    private String url;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "theme", nullable = false)
    private ThemeType theme;

    @OneToMany(mappedBy = "website")
    private Set<Page> pages = new HashSet<>();

    @OneToOne(mappedBy = "website")
    @JsonIgnore
    private AppUser creator;

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

    public Website url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ThemeType getTheme() {
        return theme;
    }

    public Website theme(ThemeType theme) {
        this.theme = theme;
        return this;
    }

    public void setTheme(ThemeType theme) {
        this.theme = theme;
    }

    public Set<Page> getPages() {
        return pages;
    }

    public Website pages(Set<Page> pages) {
        this.pages = pages;
        return this;
    }

    public Website addPages(Page page) {
        this.pages.add(page);
        page.setWebsite(this);
        return this;
    }

    public Website removePages(Page page) {
        this.pages.remove(page);
        page.setWebsite(null);
        return this;
    }

    public void setPages(Set<Page> pages) {
        this.pages = pages;
    }

    public AppUser getCreator() {
        return creator;
    }

    public Website creator(AppUser appUser) {
        this.creator = appUser;
        return this;
    }

    public void setCreator(AppUser appUser) {
        this.creator = appUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Website)) {
            return false;
        }
        return id != null && id.equals(((Website) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Website{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", theme='" + getTheme() + "'" +
            "}";
    }
}
