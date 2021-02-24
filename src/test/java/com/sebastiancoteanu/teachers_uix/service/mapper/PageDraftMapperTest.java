package com.sebastiancoteanu.teachers_uix.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PageDraftMapperTest {

    private PageDraftMapper pageDraftMapper;

    @BeforeEach
    public void setUp() {
        pageDraftMapper = new PageDraftMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(pageDraftMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(pageDraftMapper.fromId(null)).isNull();
    }
}
