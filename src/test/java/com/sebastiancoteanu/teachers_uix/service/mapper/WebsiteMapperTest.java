package com.sebastiancoteanu.teachers_uix.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class WebsiteMapperTest {

    private WebsiteMapper websiteMapper;

    @BeforeEach
    public void setUp() {
        websiteMapper = new WebsiteMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(websiteMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(websiteMapper.fromId(null)).isNull();
    }
}
