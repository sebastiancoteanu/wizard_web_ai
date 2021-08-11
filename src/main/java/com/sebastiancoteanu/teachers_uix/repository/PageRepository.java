package com.sebastiancoteanu.teachers_uix.repository;

import com.sebastiancoteanu.teachers_uix.domain.Page;

import com.sebastiancoteanu.teachers_uix.domain.Website;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Page entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
  Optional<List<Page>> findByWebsiteId(Long id);

  Optional<List<Page>> findByWebsiteIdAndIsPublishedOrderByOrderAsc(Long id, Boolean isPublished);
}
