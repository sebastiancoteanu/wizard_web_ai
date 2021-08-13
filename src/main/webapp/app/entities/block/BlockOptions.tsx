import React, { FC } from 'react';
import styled from "styled-components";
import { IBlock } from "app/shared/model/block.model";

const Options = styled.ul`
  
`;

const Option = styled.li`
  
`;

const CssProp = styled.div`
`;

const ContentItem = styled.div`
`;

interface Props {
  options?: string;
}

const BlockOptions: FC<Props> = ({ options }) => {
  if (!options) {
    return null;
  }

  const parsedOptions: IBlock['options'] = JSON.parse(options) as IBlock['options'];

  return (
    <Options>
      {parsedOptions?.content && (
        <Option>
          {parsedOptions?.content.map((contentItem, index) => contentItem.value ? (
            <ContentItem key={index}>{`${contentItem.value} ${contentItem.description}`}</ContentItem>
          ) : <span>no value set; &nbsp;</span>)}
        </Option>
      )}
      {parsedOptions?.cssProperties && (
        <Option>
          {Object.keys(parsedOptions.cssProperties).map((cssProp) => parsedOptions.cssProperties[cssProp] && (
            <CssProp>{`${cssProp}: ${parsedOptions.cssProperties[cssProp]}`}</CssProp>
          ))}
        </Option>
      )}
    </Options>
  );
};

export default BlockOptions;
