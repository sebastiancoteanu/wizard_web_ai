package com.sebastiancoteanu.teachers_uix.repository;

import com.sebastiancoteanu.teachers_uix.domain.Block;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * Spring Data  repository for the Block entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {
  Long deleteAllByPageDraftIdAndIdIsNotIn(Long pageDraftId, Collection<Long> idList);
}
