import React, { ChangeEvent, FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch } from "react-redux";
import { updateEditingPageBlockContent } from "app/entities/block/block.reducer";

const StyledTextArea = styled(TextareaAutosize)<{ cssProps: CSSProperties}>`
  width: 100%;
  border: none;
  margin: 0;
  background: transparent;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled(StyledTextArea)(({ cssProps }) => ({
  ...cssProps,
  margin: '0 !important',
  padding: '0 !important',
}));

interface Props {
  cssProps?: CSSProperties;
  text: string;
}

const EditableText: FC<Props> = ({ text, cssProps }) => {
  const dispatch = useDispatch()

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateEditingPageBlockContent([{
      value: e.target.value,
    }]));
  };

  return (
    <TextArea
      spellCheck={false}
      placeholder={text}
      value={text}
      onChange={handleOnChange}
      autoFocus
      {...{cssProps}}
    />
  );
};

export default EditableText;
