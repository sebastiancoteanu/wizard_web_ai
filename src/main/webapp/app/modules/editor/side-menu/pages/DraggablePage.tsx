import React, { FC } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditablePage from "app/modules/editor/side-menu/pages/EditablePage";
import ActionBar from "app/modules/editor/action-bar";
import { IPage } from "app/shared/model/page.model";

const Wrapper = styled.div`
  margin-bottom: 12px;
`;

interface Props {
  index: number;
  page: IPage;
}

const DraggablePage: FC<Props> = ({ index, page }) => {
  return (
    <Draggable draggableId={String(page.id)} index={index}>
      {provided => (
        <Wrapper
          ref={provided.innerRef}
          style={provided.draggableProps.style}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <EditablePage dragProps={provided.dragHandleProps} page={page} />
        </Wrapper>
      )}
    </Draggable>
  );
}

export default DraggablePage;
