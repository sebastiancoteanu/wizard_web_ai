import React, { FC } from 'react';
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 72px;
  height: 72px;
`;

const loadingAnimation = keyframes`
  0% { top: 8px; height: 80px; }
  50%, 100% { top: 24px; height: 40px; }
`;

const Bar = styled.div`
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 8px;
  background: ${({ theme }) => theme.palette.primary.main};
  animation: ${loadingAnimation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  
  &:nth-child(1) {
    left: 6px;
    animation-delay: -0.24s;
  }
  
  &:nth-child(2) {
    left: 30px;
    animation-delay: -0.12s;
  }
  
  &:nth-child(3) {
    left: 54px;
    animation-delay: 0s;
  }
`;

interface Props {
  className?: string;
}

const PageLoader: FC<Props> = ({ className }) => (
  <Wrapper className={className}>
    <Bar />
    <Bar />
    <Bar />
  </Wrapper>
);

export default PageLoader;
