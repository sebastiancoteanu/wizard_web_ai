import React, { FC } from 'react';
import styled from "styled-components";
import EditablePage from "app/modules/editor/side-menu/pages/EditablePage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -12px;
`;

const Pages: FC = () => {
  return (
    <Wrapper>
      <EditablePage name="Home" />
      <EditablePage name="About me" />
      <EditablePage isEdit />
    </Wrapper>
  );
};

export default Pages;
