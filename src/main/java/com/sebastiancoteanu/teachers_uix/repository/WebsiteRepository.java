package com.sebastiancoteanu.teachers_uix.repository;

import com.sebastiancoteanu.teachers_uix.domain.Website;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Website entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WebsiteRepository extends JpaRepository<Website, Long> {
  Optional<Website> findByUrl(String url);
}
