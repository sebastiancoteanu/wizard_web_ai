import React, { FC, useEffect } from 'react';
import { IPage } from "app/shared/model/page.model";
import styled from "styled-components";
import { createEntity, getPageDraftsByPageId } from "app/entities/page-draft/page-draft.reducer";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { IPageDraft } from "app/shared/model/page-draft.model";
import { updateEntity } from "app/entities/page/page.reducer";
import { Icons } from "app/modules/assets/fonts/icons";
import Icon from "app/modules/ui-kit/Icon";
import TextButton from "app/modules/ui-kit/TextButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  margin: -4px 0;
`;

const PageDraft = styled.div`
  cursor: pointer;
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

const AddPageDraft = styled(TextButton)`
  padding: 10px;
  align-self: flex-end;
  
  &, &:active {
    color: ${({ theme }) => theme.colors.lightGray};
  }
  
  i {
    font-size: 10px;
  }
  
  span {
    font-size: 12px;
    padding-left: 4px;
  }
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
  };

  const handleCreatePageDraft = () => {
    dispatch(createEntity({ pageId: page.id }));
  };

  return (
    <Wrapper>
      {pageDrafts && pageDrafts.map((pageDraft, index) => (
        <PageDraft key={pageDraft.id} onClick={() => handleSelectPageDraft(pageDraft.id)}>
          {`Draft ${index}`}
          {page.selectedPageDraftId === pageDraft.id && <ActiveLabel>Active</ActiveLabel>}
        </PageDraft>
      ))}
      <AddPageDraft onClick={handleCreatePageDraft}>
        <Icon name={Icons.Plus} />
        <span>New draft</span>
      </AddPageDraft>
    </Wrapper>
  );
}

export default PageDrafts;
