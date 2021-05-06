import React, { FC, useState } from 'react';
import styled, { css, keyframes } from "styled-components";
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import { IconSize } from "app/modules/ui-kit/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkestGray};
`;

const Title = styled.div`
  padding: 8px 12px;
  display: flex;
  cursor: pointer;
  letter-spacing: 0.5px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 8px 0;
`;

const rotateRight = keyframes`
 from { transform: rotate(0deg); }
 to { transform: rotate(90deg); }
`;

const rotateDown = keyframes`
 from { transform: rotate(90deg); }
 to { transform: rotate(0deg); }
`;

const ExpandIcon = styled(IconButton)<{ isSectionOpen }>`
  color: ${({ theme }) => theme.colors.lightestGray};
  ${({ isSectionOpen }) => isSectionOpen ? css`
    animation: ${rotateRight} 0.1s ease-in forwards;
  ` : css`
    animation: ${rotateDown} 0.1s ease-in forwards;
  `}
  margin-right: 6px;
  font-size: 8px;
`;

interface Props {
  title: string;
  isDefaultOpen?: boolean;
}

const StyleSection: FC<Props> = ({ children, isDefaultOpen= false, title }) => {
  const [isSectionOpen, setOpen] = useState(isDefaultOpen);
  return (
    <Wrapper>
      <Title onClick={() => setOpen(!isSectionOpen)}>
        <ExpandIcon
          size={IconSize.SMALLEST}
          name={Icons.ArrowheadPointingToTheRight}
          isSectionOpen={isSectionOpen}
        />
        {title}
      </Title>
      {isSectionOpen && (
        <Content>
          {children}
        </Content>
      )}
    </Wrapper>
  )
};

export default StyleSection;
