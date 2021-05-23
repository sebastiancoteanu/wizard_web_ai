package com.sebastiancoteanu.teachers_uix.repository;

import com.sebastiancoteanu.teachers_uix.domain.Page;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Page entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
}
