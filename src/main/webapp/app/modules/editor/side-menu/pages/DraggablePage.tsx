import React, { FC } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditablePage from "app/modules/editor/side-menu/pages/EditablePage";
import ActionBar from "app/modules/editor/action-bar";
import { IPage } from "app/shared/model/page.model";

const Wrapper = styled.div`
`;

interface Props {
  index: number;
  name: string;
  pageId: IPage['id'];
}

const DraggablePage: FC<Props> = ({ index, name, pageId }) => {
  return (
    <Draggable draggableId={name} index={index}>
      {provided => (
        <Wrapper
          ref={provided.innerRef}
          style={provided.draggableProps.style}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <EditablePage name={name} dragProps={provided.dragHandleProps} pageId={pageId} />
        </Wrapper>
      )}
    </Draggable>
  );
}

export default DraggablePage;
