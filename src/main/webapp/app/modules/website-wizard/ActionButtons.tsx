import React, { FC, useMemo } from 'react';
import { ValidSteps } from "app/modules/website-wizard/types";
import { Icons } from "app/modules/assets/fonts/icons";
import styled from "styled-components";
import Icon from "app/modules/ui-kit/Icon";
import PrimaryButton from "app/modules/ui-kit/PrimaryButton";
import BorderButton from "app/modules/ui-kit/BorderButton";
import { isStepValid } from "app/modules/website-wizard/utils";

const Wrapper = styled.div`
  display: flex;
  padding: 0 40px;
  align-self: center;
  width: 70%;
  justify-content: flex-end;
`;

const NextStepIcon = styled(Icon)`
  margin-left: 4px;
  margin-right: -4px;
  transition: all 0.1s ease-in;
`;

const NextStepButton = styled(PrimaryButton)`
  &, &:focus {
    background: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.neutral.white};
  }
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  
  &:hover:not(:disabled) {
    ${NextStepIcon} {
      transform: translateX(4px);
    }
  }
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
}

const ActionButtons: FC<Props> = ({
  activeStep,
  setActiveStep,
  isNextStepDisabled,
  onOptionsConfirm,
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
      <NextStepButton onClick={handleNextStep} disabled={isNextStepDisabled}>
        {activeStep === ValidSteps.PAGES ? (
          <span>Confirm</span>
        ) : (
          <>
            <span>Next step</span>
            <NextStepIcon name={Icons.RightArrow}/>
          </>
        )}
      </NextStepButton>
    </Wrapper>
  );
}

export default ActionButtons;
