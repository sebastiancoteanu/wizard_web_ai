import React, { FC } from 'react';
import styled, { css, keyframes } from "styled-components";
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

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
  left: 50%;
  transform: translateX(-50%);
  top: -16px;
  box-sizing: border-box;
  border-radius: 10px;

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
}

const ActionBar: FC<Props> = ({ dragProps, isSelected }) => (
  <Wrapper isSelected={isSelected}>
    <GrabButtonWrapper {...dragProps}>
      <ActionButton name={Icons.Drag} />
    </GrabButtonWrapper>
    <ActionButton name={Icons.UpArrow} />
    <ActionButton name={Icons.DownArrow} />
  </Wrapper>
);

export default ActionBar;
