import React, { ChangeEvent, FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';
import { IBlockOptions } from "app/shared/model/block.model";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { BlockState, updateEditingPageBlockContent, updateEditingPageBlockCss } from "app/entities/block/block.reducer";
import useCurrentEditingBlock from "app/modules/editor/style-manager/useCurrentEditingBlock";

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin: 0;
  background: transparent;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled(StyledTextArea)`
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  color: inherit;
  background: inherit;
`;

interface Props {
  cssProps?: CSSProperties;
  placeHolder: string;
}

const EditableText: FC<Props> = ({ placeHolder }) => {
  const editingBlock = useCurrentEditingBlock();
  const dispatch = useDispatch()

  const content = editingBlock?.options?.content?.length ? editingBlock.options.content[0] : placeHolder;

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateEditingPageBlockContent([e.target.value]));
  };

  return (
    <TextArea placeholder={content} value={content} onChange={handleOnChange} autoFocus/>
  );
}

export default EditableText;
