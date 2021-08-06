package com.sebastiancoteanu.teachers_uix.service.impl;

import com.sebastiancoteanu.teachers_uix.service.BlockService;
import com.sebastiancoteanu.teachers_uix.domain.Block;
import com.sebastiancoteanu.teachers_uix.repository.BlockRepository;
import com.sebastiancoteanu.teachers_uix.service.dto.BlockDTO;
import com.sebastiancoteanu.teachers_uix.service.dto.BlocksDTO;
import com.sebastiancoteanu.teachers_uix.service.dto.PageDTO;
import com.sebastiancoteanu.teachers_uix.service.mapper.BlockMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Block}.
 */
@Service
@Transactional
public class BlockServiceImpl implements BlockService {

    private final Logger log = LoggerFactory.getLogger(BlockServiceImpl.class);

    private final BlockRepository blockRepository;

    private final BlockMapper blockMapper;

    public BlockServiceImpl(BlockRepository blockRepository, BlockMapper blockMapper) {
        this.blockRepository = blockRepository;
        this.blockMapper = blockMapper;
    }

    @Override
    public BlockDTO save(BlockDTO blockDTO) {
        log.debug("Request to save Block : {}", blockDTO);
        Block block = blockMapper.toEntity(blockDTO);
        block = blockRepository.save(block);
        return blockMapper.toDto(block);
    }

    @Override
    public List<BlockDTO> saveAll(List<BlockDTO> blocksDTO) {
        List blocks = new ArrayList();
        for (BlockDTO blockDTO : blocksDTO) {
            blocks.add(blockMapper.toEntity(blockDTO));
        }
        blocks = blockRepository.saveAll(blocks);
        return blocks;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlockDTO> findAll() {
        log.debug("Request to get all Blocks");
        return blockRepository.findAll().stream()
            .map(blockMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<BlockDTO> findOne(Long id) {
        log.debug("Request to get Block : {}", id);
        return blockRepository.findById(id)
            .map(blockMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Block : {}", id);
        blockRepository.deleteById(id);
    }
}
