import React, { FC } from 'react';
import styled, { css, keyframes } from "styled-components";
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { IconSize } from "app/modules/ui-kit/types";
import { useDispatch } from "react-redux";
import {
  deletePageBlock,
  duplicateBlock as duplicatePageBlock,
  moveBlockOnePosition,
} from "app/entities/block/block.reducer";
import { BlockMove } from "app/modules/editor/action-bar/types";

const reveal = keyframes`
  0% { opacity: 0; pointer-events: none; }
  100% { opacity: 1; pointer-events: auto; }
`;

const Wrapper = styled.div<Pick<Props, 'isSelected'>>`
  display: flex;
  pointer-events: none;
  opacity: 0;
  background: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  right: -0.5px;
  top: -24px;
  box-sizing: border-box;

  ${({ isSelected }) => isSelected && css`
    animation: ${reveal} 0.1s ease-in 0s normal forwards;
  `}
`;

const ActionButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.neutral.white};
  padding: 5px;

  &:hover, &:focus {
    color: ${({ theme }) => theme.palette.neutral.white};
  }
`;

const GrabButtonWrapper = styled.div`
  ${ActionButton} {
    pointer-events: none;
  }
`;

interface Props {
  dragProps: DraggableProvidedDragHandleProps;
  isSelected: boolean;
  index: number;
}

const ActionBar: FC<Props> = ({ dragProps, isSelected, index   }) => {
  const dispatch = useDispatch();

  const handleDeleteBlock = () => {
    dispatch(deletePageBlock(index));
  }

  /**
   * @function
   * @param direction - BlockMove.DOWN moves down, BlockMove.UP moves up
   */
  const moveBlock = (direction) => {
    if (index === 0 && direction === BlockMove.UP) {
      return;
    }
    dispatch(moveBlockOnePosition(index, index + direction))
  };

  const duplicateBlock = () => dispatch(duplicatePageBlock(index));

  return (
    <Wrapper isSelected={isSelected}>
      <GrabButtonWrapper {...dragProps}>
        <ActionButton name={Icons.Drag} size={IconSize.SMALL}/>
      </GrabButtonWrapper>
      <ActionButton name={Icons.UpArrow} size={IconSize.SMALL} onClick={() => moveBlock(BlockMove.UP)}/>
      <ActionButton name={Icons.DownArrow} size={IconSize.SMALL} onClick={() => moveBlock(BlockMove.DOWN)} />
      <ActionButton name={Icons.Copy} size={IconSize.SMALL} onClick={duplicateBlock} />
      <ActionButton name={Icons.Delete} size={IconSize.SMALL} onClick={handleDeleteBlock}/>
    </Wrapper>
  );
}

export default ActionBar;
