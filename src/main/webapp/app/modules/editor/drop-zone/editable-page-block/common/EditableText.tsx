import React, { FC } from 'react';
import styled from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin: 0;
  background: transparent;
  padding: 0;
  
  &:focus {
    outline: none;
  }
`;

const EditableText: FC = () => (
  <TextArea placeholder="Type your text here" value={"Type your text here"} autoFocus />
);

export default EditableText;
