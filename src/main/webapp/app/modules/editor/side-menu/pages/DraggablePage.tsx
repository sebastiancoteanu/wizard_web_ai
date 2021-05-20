import React, { FC } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditablePage from "app/modules/editor/side-menu/pages/EditablePage";
import ActionBar from "app/modules/editor/action-bar";

const Wrapper = styled.div`
`;

interface Props {
  index: number;
  name: string;
}

const DraggablePage: FC<Props> = ({ index, name }) => {
  return (
    <Draggable draggableId={name} index={index}>
      {provided => (
        <Wrapper
          ref={provided.innerRef}
          style={provided.draggableProps.style}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <EditablePage name={name} dragProps={provided.dragHandleProps} />
        </Wrapper>
      )}
    </Draggable>
  );
}

export default DraggablePage;
