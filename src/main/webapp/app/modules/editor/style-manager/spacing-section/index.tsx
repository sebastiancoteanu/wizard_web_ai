import React, { FC } from 'react';
import StyleSection from "app/modules/editor/style-manager/StyleSection";
import styled from "styled-components";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import SpacingSectionBox from "app/modules/editor/style-manager/spacing-section/SpacingSeciontBox";

const InnerWrapper = styled.div`
  width: 100%;
  height: 154px;
  margin: -8px 0;
`;

const SpacingSection: FC = () => {
  return (
    <StyleSection title="Spacing" isDefaultOpen>
      <InnerWrapper>
        <SpacingSectionBox title="Margin" namePrefix="margin" >
          <SpacingSectionBox title="Padding" namePrefix="padding" />
        </SpacingSectionBox>
      </InnerWrapper>
    </StyleSection>
  );
};

export default SpacingSection;
