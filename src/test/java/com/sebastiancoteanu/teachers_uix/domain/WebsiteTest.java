package com.sebastiancoteanu.teachers_uix.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sebastiancoteanu.teachers_uix.web.rest.TestUtil;

public class WebsiteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Website.class);
        Website website1 = new Website();
        website1.setId(1L);
        Website website2 = new Website();
        website2.setId(website1.getId());
        assertThat(website1).isEqualTo(website2);
        website2.setId(2L);
        assertThat(website1).isNotEqualTo(website2);
        website1.setId(null);
        assertThat(website1).isNotEqualTo(website2);
    }
}
