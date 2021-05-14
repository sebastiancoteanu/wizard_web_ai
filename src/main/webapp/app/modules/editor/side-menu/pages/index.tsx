import React, { FC } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pages: FC = () => {
  return (
    <Wrapper>
      <p>Home</p>
      <p>About</p>
    </Wrapper>
  );
};

export default Pages;
