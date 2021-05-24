package com.sebastiancoteanu.teachers_uix.repository;

import com.sebastiancoteanu.teachers_uix.domain.AppUser;
import com.sebastiancoteanu.teachers_uix.domain.Page;
import com.sebastiancoteanu.teachers_uix.domain.PageDraft;

import com.sebastiancoteanu.teachers_uix.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PageDraft entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PageDraftRepository extends JpaRepository<PageDraft, Long> {
  Optional<List<PageDraft>> findByPage(Page page);
}
