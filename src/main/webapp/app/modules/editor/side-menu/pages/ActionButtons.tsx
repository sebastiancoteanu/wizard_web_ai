import React, { FC } from 'react';
import styled from "styled-components";
import { Icons } from "app/modules/assets/fonts/icons";
import { ActionButton } from "app/modules/editor/side-menu/pages/common";
import { deleteEntity, updateEntity } from "app/entities/page/page.reducer";
import { useDispatch } from "react-redux";
import { IPage } from "app/shared/model/page.model";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

const ReorderButton = styled(ActionButton)`
  pointer-events: none;
`;

interface Props {
  page: IPage;
  dragProps: DraggableProvidedDragHandleProps;
  onEditStart: () => void;
}

const ActionButtons: FC<Props> = ({ page, dragProps, onEditStart }) => {
  const dispatch = useDispatch();

  const handleDeletePage = () => {
    dispatch(deleteEntity(page.id));
  }

  const handlePageRestricted = () => {
    dispatch(updateEntity({
      ...page,
      isRestricted: !page.isRestricted
    }));
  };

  return (
    <>
      <ActionButton
        onClick={handlePageRestricted}
        name={page.isRestricted ? Icons.Invisible : Icons.Visible}
      />
      <ActionButton
        onClick={onEditStart}
        name={Icons.Pen}
      />
      <ActionButton
        onClick={handleDeletePage}
        name={Icons.Delete}
      />
      <div {...dragProps} >
        <ReorderButton name={Icons.Scroll}/>
      </div>
    </>
  );
}

export default ActionButtons;
