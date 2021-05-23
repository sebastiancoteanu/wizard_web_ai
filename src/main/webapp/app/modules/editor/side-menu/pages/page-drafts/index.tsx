import React, { FC } from 'react';
import { IPage } from "app/shared/model/page.model";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
`;

const PageDraft = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.darkestGray};
`;

interface Props {
  page: IPage;
}

const PageDrafts: FC<Props> = ({ page }) => {
  return (
    <Wrapper>
      <PageDraft>Draft 1</PageDraft>
      <PageDraft>Draft 2</PageDraft>
    </Wrapper>
  );
}

export default PageDrafts;
