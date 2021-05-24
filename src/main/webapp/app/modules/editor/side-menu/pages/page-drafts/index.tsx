import React, { FC, useEffect } from 'react';
import { IPage } from "app/shared/model/page.model";
import styled from "styled-components";
import { getPageDraftsByPageId } from "app/entities/page-draft/page-draft.reducer";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { IPageDraft } from "app/shared/model/page-draft.model";
import { updateEntity } from "app/entities/page/page.reducer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  margin: -4px 0;
`;

const PageDraft = styled.div`
  font-size: 14px;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  min-height: 47px;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
`;

const ActiveLabel = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 40px;
  font-size: 8px;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-left: auto;
  padding: 6px 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

interface Props {
  page: IPage;
}

const PageDrafts: FC<Props> = ({ page }) => {
  const pageDrafts = useSelector<IRootState, IPageDraft[]>(
    state => state.pageDraft.pageMappedEntities[page.id]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPageDraftsByPageId(page.id));
  }, []);

  const handleSelectPageDraft = (id: IPageDraft['id']) => {
    dispatch(updateEntity({
      ...page,
      selectedPageDraftId: id,
    }))
  }

  if (!pageDrafts) {
    return null;
  }

  return (
    <Wrapper>
      {pageDrafts.map((pageDraft, index) => (
        <PageDraft key={pageDraft.id} onClick={() => handleSelectPageDraft(pageDraft.id)}>
          {`Draft ${index}`}
          {page.selectedPageDraftId === pageDraft.id && <ActiveLabel>Active</ActiveLabel>}
        </PageDraft>
      ))}
    </Wrapper>
  );
}

export default PageDrafts;
