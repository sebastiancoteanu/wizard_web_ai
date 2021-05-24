import React, { FC, useCallback, useState } from 'react';
import styled, { css } from "styled-components";
import withClickInside from "app/modules/editor/side-menu/withClickInside";
import { Icons } from "app/modules/assets/fonts/icons";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { ActionButton, StyledEditablePage } from "app/modules/editor/side-menu/pages/common";
import { useDispatch } from "react-redux";
import { setEditingPage, updateEntity } from "app/entities/page/page.reducer";
import { IPage } from "app/shared/model/page.model";
import debounce from 'lodash.debounce';
import useEditingPage from "app/modules/editor/side-menu/pages/useEditingPage";
import PageDrafts from "app/modules/editor/side-menu/pages/page-drafts";
import ActionButtons from "app/modules/editor/side-menu/pages/ActionButtons";

const Wrapper = styled.div<{ isClickedInside: boolean, isEditing: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.1s ease-in;
  border-bottom: 1px inset ${({ theme }) => theme.colors.lightGray};

  &:hover, &:active {
    background-color: ${({ theme }) => theme.colors.darkestGray};
  }
  
  ${({ isEditing }) => isEditing && css`
    background-color: ${({ theme }) => theme.colors.darkestGray};
    margin-left: -24px;
    margin-right: -26px;
    padding: 0 24px;
  `}
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
`;

const PageName = styled.div`
  width: 100%;
  min-height: 46px;
  padding-left: 9px;
  display: flex;
  align-items: center;
`;

const PageDraftsShowButton = styled(ActionButton)<{ isDraftListOpen: boolean }>`
  &:not(:last-child) {
    margin-right: 0;
  }
  font-size: 10px;
  transition: all 0.1s ease-in;
  margin-left: 4px;

  ${({ isDraftListOpen }) => isDraftListOpen && css`
    transform: rotate(180deg);
  `}
`;

interface Props {
  dragProps: DraggableProvidedDragHandleProps;
  page: IPage;
}

const EditablePage: FC<Props> = ({ page, dragProps }) => {
  const [url, setUrl] = useState(page.url);
  const [isDraftListOpen, setDraftListOpen] = useState(false);
  const { wrapperRef, isClickedInside, clickInside } = withClickInside();
  const dispatch = useDispatch();
  const { isEditing } = useEditingPage(page.id);

  const handleSave = useCallback(
    debounce((nextValue) => {
      dispatch(updateEntity({
        ...page,
        url: nextValue,
      }))
    }, 1500),
    [],
  );

  const handleChange = (_, value) => {
    setUrl(value);
    handleSave(value);
  };

  const handlePageSelect = () => dispatch(setEditingPage(page));

  return (
    <Wrapper ref={wrapperRef} isClickedInside={isClickedInside} isEditing={isEditing}>
      <MainContent>
        {isClickedInside ? (
          <StyledEditablePage onChange={handleChange} value={url} placeholder="Page URL" autoFocus />
        ) : (
          <>
            <PageDraftsShowButton
              name={Icons.CarretDown}
              isDraftListOpen={isDraftListOpen}
              onClick={() => setDraftListOpen(!isDraftListOpen)}
            />
            <PageName onClick={handlePageSelect}>{page.url}</PageName>
            <ActionButtons
              page={page}
              dragProps={dragProps}
              onEditStart={clickInside}
            />
          </>
        )}
      </MainContent>
      {isDraftListOpen && <PageDrafts page={page} />}
    </Wrapper>
  );
}

export default EditablePage;
