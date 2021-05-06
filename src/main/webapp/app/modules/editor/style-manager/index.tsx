import React, { FC, useState } from 'react';
import styled, { CSSProperties } from "styled-components";
import StyleSection from "app/modules/editor/style-manager/StyleSection";
import EditableProp from "app/modules/editor/style-manager/EditableProp";

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
  const [props, setProps] = useState<CSSProperties>({
    fontSize: '200px',
    fontWeight: 300,
  });

  const handleOnChange = (name, value) => {
    setProps({
      ...props,
      [name]: value,
    })
  };

  return (
    <Wrapper>
      <StyleSection title="Typography" isDefaultOpen>
        <InlineGroupProps>
          <EditableProp name="fontSize" label="Font size" value={props.fontSize} onChange={handleOnChange} />
          <EditableProp name="fontWeight" label="Font weight" value={props.fontWeight} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="color" label="Font color" value={props.color} type="color" onChange={handleOnChange} />
          <EditableProp name="lineHeight" label="Line height" value={props.lineHeight} onChange={handleOnChange} />
        </InlineGroupProps>
      </StyleSection>
      <StyleSection title="Sizes" isDefaultOpen>
        <InlineGroupProps>
          <EditableProp name="width" label="Width" value={props.width} onChange={handleOnChange} />
          <EditableProp name="height" label="Height" value={props.height} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="minWidth" label="Min width" value={props.minWidth} onChange={handleOnChange} />
          <EditableProp name="maxWidth" label="Max width" value={props.maxWidth} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="minHeight" label="Min height" value={props.minHeight} onChange={handleOnChange} />
          <EditableProp name="maxHeight" label="Max height" value={props.maxHeight} onChange={handleOnChange} />
        </InlineGroupProps>
      </StyleSection>
    </Wrapper>
  );
};

export default StyleManager;
