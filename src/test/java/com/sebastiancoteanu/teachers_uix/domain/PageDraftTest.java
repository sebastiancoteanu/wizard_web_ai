package com.sebastiancoteanu.teachers_uix.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sebastiancoteanu.teachers_uix.web.rest.TestUtil;

public class PageDraftTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PageDraft.class);
        PageDraft pageDraft1 = new PageDraft();
        pageDraft1.setId(1L);
        PageDraft pageDraft2 = new PageDraft();
        pageDraft2.setId(pageDraft1.getId());
        assertThat(pageDraft1).isEqualTo(pageDraft2);
        pageDraft2.setId(2L);
        assertThat(pageDraft1).isNotEqualTo(pageDraft2);
        pageDraft1.setId(null);
        assertThat(pageDraft1).isNotEqualTo(pageDraft2);
    }
}
