package com.sebastiancoteanu.teachers_uix.repository;

import com.sebastiancoteanu.teachers_uix.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
