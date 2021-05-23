import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import styled, { css } from "styled-components";
import withClickInside from "app/modules/editor/side-menu/withClickInside";
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { StyledEditablePage } from "app/modules/editor/side-menu/pages/common";
import { useDispatch } from "react-redux";
import { deleteEntity, setEditingPage, updateEntity } from "app/entities/page/page.reducer";
import { IPage } from "app/shared/model/page.model";
import debounce from 'lodash.debounce';
import useEditingPage from "app/modules/editor/side-menu/pages/useEditingPage";

const Wrapper = styled.div<{ isClickedInside: boolean, isEditing: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  transition: all 0.1s ease-in;

  &:hover, &:active {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  
  ${({ isEditing }) => isEditing && css`
    background-color: ${({ theme }) => theme.colors.lightGray};
    margin-left: -24px;
    margin-right: -26px;
    padding: 0 24px;
  `}
`;

const PageName = styled.div`
  width: 100%;
  min-height: 46px;
  padding-left: 9px;
  display: flex;
  align-items: center;
`;

const ActionButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 12px;
  
  &:not(:last-child) {
    margin-right: 6px;
  }
`;

const ReorderButton = styled(ActionButton)`
  pointer-events: none;
`;

interface Props {
  dragProps: DraggableProvidedDragHandleProps;
  page: IPage;
}

const EditablePage: FC<Props> = ({ page, dragProps }) => {
  const [url, setUrl] = useState(page.url);
  const { wrapperRef, isClickedInside, clickInside } = withClickInside();
  const dispatch = useDispatch();
  const { isEditing } = useEditingPage(page.id);

  const handleDeletePage = () => {
    dispatch(deleteEntity(page.id));
  }

  const handlePageRestricted = () => {
    dispatch(updateEntity({
      ...page,
      isRestricted: !page.isRestricted
    }))
  };

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
      {isClickedInside ? (
        <StyledEditablePage onChange={handleChange} value={url} placeholder="Page URL" autoFocus />
      ) : (
        <>
          <PageName onClick={handlePageSelect}>{page.url}</PageName>
          <ActionButton
            onClick={handlePageRestricted}
            name={page.isRestricted ? Icons.Invisible : Icons.Visible}
          />
          <ActionButton
            onClick={clickInside}
            name={Icons.Pen}
          />
          <ActionButton
            onClick={handleDeletePage}
            name={Icons.Delete}
          />
          <div {...dragProps} >
            <ReorderButton name={Icons.Scroll} />
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default EditablePage;
