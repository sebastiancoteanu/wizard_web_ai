package com.sebastiancoteanu.teachers_uix.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sebastiancoteanu.teachers_uix.web.rest.TestUtil;

public class WebsiteDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WebsiteDTO.class);
        WebsiteDTO websiteDTO1 = new WebsiteDTO();
        websiteDTO1.setId(1L);
        WebsiteDTO websiteDTO2 = new WebsiteDTO();
        assertThat(websiteDTO1).isNotEqualTo(websiteDTO2);
        websiteDTO2.setId(websiteDTO1.getId());
        assertThat(websiteDTO1).isEqualTo(websiteDTO2);
        websiteDTO2.setId(2L);
        assertThat(websiteDTO1).isNotEqualTo(websiteDTO2);
        websiteDTO1.setId(null);
        assertThat(websiteDTO1).isNotEqualTo(websiteDTO2);
    }
}
