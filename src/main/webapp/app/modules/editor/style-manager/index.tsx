import React, { FC, useState } from 'react';
import styled, { CSSProperties } from "styled-components";
import StyleSection from "app/modules/editor/style-manager/StyleSection";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { changeBlockProps } from "app/modules/editor/editor.reducer";

const Wrapper = styled.div`
  padding: 12px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  width: 300px;
  background: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.lightestGray};
`;

const InlineGroupProps = styled.div`
  display: flex;
  padding: 0 12px;
  
  &:not(:first-child) {
    margin-top: 12px;
  }
`;

const StyleManager: FC = () => {
  const { cssProps } = useSelector<IRootState, IRootState['editor']>(state => state.editor);
  const dispatch = useDispatch()

  const handleOnChange = (name, value) => {
    dispatch(changeBlockProps({ [name]: value }));
  };

  return (
    <Wrapper>
      <StyleSection title="Typography" isDefaultOpen>
        <InlineGroupProps>
          <EditableProp name="fontSize" label="Font size" value={cssProps.fontSize} onChange={handleOnChange} />
          <EditableProp name="fontWeight" label="Font weight" value={cssProps.fontWeight} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="color" label="Font color" value={cssProps.color} type="color" onChange={handleOnChange} />
          <EditableProp name="lineHeight" label="Line height" value={cssProps.lineHeight} onChange={handleOnChange} />
        </InlineGroupProps>
      </StyleSection>
      <StyleSection title="Sizes" isDefaultOpen>
        <InlineGroupProps>
          <EditableProp name="width" label="Width" value={cssProps.width} onChange={handleOnChange} />
          <EditableProp name="height" label="Height" value={cssProps.height} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="minWidth" label="Min width" value={cssProps.minWidth} onChange={handleOnChange} />
          <EditableProp name="maxWidth" label="Max width" value={cssProps.maxWidth} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="minHeight" label="Min height" value={cssProps.minHeight} onChange={handleOnChange} />
          <EditableProp name="maxHeight" label="Max height" value={cssProps.maxHeight} onChange={handleOnChange} />
        </InlineGroupProps>
      </StyleSection>
    </Wrapper>
  );
};

export default StyleManager;
