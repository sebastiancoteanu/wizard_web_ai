import React, { FC } from 'react';
import styled, { css } from "styled-components";
import { useDrag } from "react-dnd";
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { blockTypeToImageMapper } from "app/common";

const Blueprint = styled.img<{isDragging: boolean }>`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: all 0.1s ease-in;
  
  ${({ isDragging }) => isDragging && css`
    opacity: 0.5;
  `}
`;

interface Props {
  blockType: BlockType;
  setPageBlocks: (blocks: BlockType[]) => void;
  pageBlocks: BlockType[];
}

const BlockBluePrint: FC<Props> = ({ blockType, setPageBlocks, pageBlocks }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'all',
    item: { type: blockType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item) {
      setPageBlocks([...pageBlocks, item.type]);
    },
  });

  return (
    <Blueprint src={blockTypeToImageMapper[blockType]} ref={drag} isDragging={isDragging} />
  );
}

export default BlockBluePrint;
