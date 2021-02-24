package com.sebastiancoteanu.teachers_uix.service.mapper;


import com.sebastiancoteanu.teachers_uix.domain.*;
import com.sebastiancoteanu.teachers_uix.service.dto.BlockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Block} and its DTO {@link BlockDTO}.
 */
@Mapper(componentModel = "spring", uses = {PageDraftMapper.class})
public interface BlockMapper extends EntityMapper<BlockDTO, Block> {

    @Mapping(source = "pageDraft.id", target = "pageDraftId")
    BlockDTO toDto(Block block);

    @Mapping(source = "pageDraftId", target = "pageDraft")
    Block toEntity(BlockDTO blockDTO);

    default Block fromId(Long id) {
        if (id == null) {
            return null;
        }
        Block block = new Block();
        block.setId(id);
        return block;
    }
}
