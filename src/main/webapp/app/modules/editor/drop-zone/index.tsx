import React, { FC } from 'react';
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { BlockType } from "app/shared/model/enumerations/block-type.model";

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  flex: 1;
`;

const EditablePageBlock = styled.div``;

interface Props {
  pageBlocks: BlockType[];
}

const DropZone: FC<Props> = ({ pageBlocks }) => {
  const [{ canDrop, isOver, item }, drop] = useDrop({
    accept: 'all',
    drop: () => ({ name: 'Some name' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  return (
    <Wrapper ref={drop}>
      {pageBlocks.map((block) => (
        <EditablePageBlock key={block}>
          {block}
        </EditablePageBlock>
      ))}
    </Wrapper>
  );
}

export default DropZone;
