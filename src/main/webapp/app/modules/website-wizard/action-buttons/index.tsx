import React, { FC } from 'react';
import { ValidSteps } from "app/modules/website-wizard/types";
import { Icons } from "app/modules/assets/fonts/icons";
import styled from "styled-components";
import Icon from "app/modules/ui-kit/Icon";
import BorderButton from "app/modules/ui-kit/BorderButton";
import NextStepButton from "app/modules/website-wizard/action-buttons/NextStepButton";

const Wrapper = styled.div`
  display: flex;
  padding: 0 40px;
  align-self: center;
  width: 80%;
  justify-content: flex-end;
`;

const PrevStepIcon = styled(Icon)`
  margin-right: 4px;
  margin-left: -4px;
  transition: all 0.1s ease-in;
`;

const PrevStepButton = styled(BorderButton)`
  margin-right: 16px;

  &:hover {
    ${PrevStepIcon} {
      transform: translateX(-4px);
    }
  }
`;

interface Props {
  isNextStepDisabled: boolean;
  activeStep: number;
  setActiveStep: (_: number) => void;
  onOptionsConfirm: () => void;
  isLoading: boolean;
}

const ActionButtons: FC<Props> = ({
  activeStep,
  setActiveStep,
  isNextStepDisabled,
  onOptionsConfirm,
  isLoading,
}) => {
  const handleNextStep = () => {
    if (activeStep === ValidSteps.PAGES) {
      onOptionsConfirm();
    } else {
      setActiveStep(activeStep + 1)
    }
  };

  return (
    <Wrapper>
      {activeStep !== ValidSteps.BASIC_INFO && (
        <PrevStepButton onClick={() => setActiveStep(activeStep - 1)}>
          <PrevStepIcon name={Icons.LeftArrow}/>
          Prev Step
        </PrevStepButton>
      )}
      <NextStepButton
        isLastStep={activeStep === ValidSteps.PAGES}
        disabled={isNextStepDisabled || isLoading}
        isLoading={isLoading}
        onClick={handleNextStep}
      />
    </Wrapper>
  );
}

export default ActionButtons;
