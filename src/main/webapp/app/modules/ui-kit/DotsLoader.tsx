import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`;

const loadAnimation = keyframes`
  0% { transform: translateY(50%); }
  100% { transform: translateY(-50%); }
`;

const LoadingCircle = styled.span`
  width: 0.4em;
  height: 0.4em;
  background-color: ${({ theme }) => theme.palette.primary.main};
  opacity: 0.7;
  transform: translateY(50%);
  animation: ${loadAnimation} 0.3s linear 0s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.1125s;
  }

  &:nth-child(3) {
    animation-delay: 0.225s;
  }
  
  &:not(:last-child) {
    margin-right: 0.4em;
  }
`;

interface Props {
  className?: string
}

const DotsLoader:FC<Props> = ({ className }) => (
  <Wrapper className={className}>
    <LoadingCircle />
    <LoadingCircle />
    <LoadingCircle />
  </Wrapper>
);

export default DotsLoader;
