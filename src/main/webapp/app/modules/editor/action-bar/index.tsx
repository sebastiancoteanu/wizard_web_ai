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
  pointer-events: none;
  opacity: 0;
  background: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -16px;
  box-sizing: border-box;
  border-radius: 10px;

  ${({ isSelected }) => isSelected && css`
    animation: ${reveal} 0.1s ease-in 0s normal forwards;
  `}
`;

const ActionButtonWrapper = styled.div`
  padding: 5px;
`;

const ActionButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.neutral.white};
  pointer-events: none;

  &:hover, &:focus {
    color: ${({ theme }) => theme.palette.neutral.white};
  }
`;

interface Props {
  dragProps: DraggableProvidedDragHandleProps;
  isSelected: boolean;
}

const ActionBar: FC<Props> = ({ dragProps, isSelected }) => (
  <Wrapper isSelected={isSelected}>
    <ActionButtonWrapper {...dragProps}>
      <ActionButton name={Icons.Drag} {...dragProps} />
    </ActionButtonWrapper>
  </Wrapper>
);

export default ActionBar;
