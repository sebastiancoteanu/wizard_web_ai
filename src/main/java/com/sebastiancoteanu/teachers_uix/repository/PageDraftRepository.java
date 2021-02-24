package com.sebastiancoteanu.teachers_uix.repository;

import com.sebastiancoteanu.teachers_uix.domain.PageDraft;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PageDraft entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PageDraftRepository extends JpaRepository<PageDraft, Long> {
}
