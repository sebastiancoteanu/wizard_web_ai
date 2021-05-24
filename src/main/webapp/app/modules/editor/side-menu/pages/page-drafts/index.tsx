import React, { FC } from 'react';
import { IPage } from "app/shared/model/page.model";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  margin-top: -6px;
`;

const PageDraft = styled.div`
  font-size: 14px;
  padding: 10px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
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
