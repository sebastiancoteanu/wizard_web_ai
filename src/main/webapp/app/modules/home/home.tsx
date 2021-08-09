import './home.scss';

import React from 'react';
import styled, { keyframes } from "styled-components";
import Header from "app/shared/layout/header/header";

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  width: 100%;
  background-image: ${({ theme }): string => (
    `linear-gradient(141deg, ${theme.palette.primary.main} 15%, ${theme.palette.primary.second} 84%)`
  )};
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.palette.neutral.white};
  line-height: 1.15;
  align-items: flex-end;
`;

const reveal = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const Brand = styled.div`
  font-size: 60px;
  transform-origin: left;
  animation: ${reveal} 0.5s ease;
`;

const BrandDescription = styled.div`
  font-size: 20px;
  transform-origin: right;
  animation: ${reveal} 0.5s ease;
`;

export const Home = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          <Brand>Wizard Web Ai</Brand>
          <BrandDescription>If you can think it, we can develop it.</BrandDescription>
        </Content>
      </Wrapper>
    </>
  );
};


export default Home;
