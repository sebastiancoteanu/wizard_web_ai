import React, { FC, useState } from 'react';
import styled from "styled-components";
import PrimaryButton from "app/modules/ui-kit/PrimaryButton";
import SecondaryButton from "app/modules/ui-kit/SecondaryButton";

const Wrapper = styled.div`
  margin-left: auto;
`;

const PublishButton = styled(PrimaryButton)`
  margin-right: 15px;
`;

const TopActionButtons: FC = () => {
  const [isPublishedDisabled, setPublishDisabled] = useState(true);
  const [isDraftDisabled, setDraftDisabled] = useState(true);

  return (
    <Wrapper>
      <PublishButton disabled={isPublishedDisabled}>Publish</PublishButton>
      <SecondaryButton disabled={isDraftDisabled}>Save draft</SecondaryButton>
    </Wrapper>
  );
}

export default TopActionButtons;
