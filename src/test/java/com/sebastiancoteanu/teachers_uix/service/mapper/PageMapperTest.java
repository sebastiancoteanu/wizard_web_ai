package com.sebastiancoteanu.teachers_uix.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PageMapperTest {

    private PageMapper pageMapper;

    @BeforeEach
    public void setUp() {
        pageMapper = new PageMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(pageMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(pageMapper.fromId(null)).isNull();
    }
}
