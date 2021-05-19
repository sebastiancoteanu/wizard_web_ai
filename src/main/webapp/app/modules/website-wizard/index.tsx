import React, { FC, useMemo, useState } from 'react';
import { ValidSteps } from "app/modules/website-wizard/types";
import styled from "styled-components";
import Steps from "app/modules/website-wizard/Steps";
import BaseInfoStep from "app/modules/website-wizard/BaseInfoStep";
import PrimaryButton from "app/modules/ui-kit/PrimaryButton";
import BorderButton from "app/modules/ui-kit/BorderButton";
import Icon from "app/modules/ui-kit/Icon";
import { Icons } from "app/modules/assets/fonts/icons";
import { IWebsite } from "app/shared/model/website.model";
import { useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import ThemeStep from "app/modules/website-wizard/ThemeStep";
import { isStepValid } from "app/modules/website-wizard/utils";

const Wrapper = styled.div`
  max-width: 800px;
  width: 80%;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 3px 1px ${({theme}) => theme.colors.ivory};
  background: ${({ theme }) => theme.palette.neutral.white};
  padding-bottom: 40px;
`;

const StepContent = styled.div`
  padding: 40px 40px 40px 40px;
  min-height: 250px;
  width: 70%;
  align-self: center;
`;

const ActionButtons = styled.div`
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

const steps = [ValidSteps.BASIC_INFO, ValidSteps.THEME, ValidSteps.PAGES];

const renderStep = (step: ValidSteps, draftWebsite: IWebsite) => {
  switch (step) {
    case ValidSteps.BASIC_INFO:
      return <BaseInfoStep url={draftWebsite.url} />;
    case ValidSteps.THEME:
      return <ThemeStep theme={draftWebsite.theme} />;
    case ValidSteps.PAGES:
      return <BaseInfoStep url={draftWebsite.url} />;
    default:
      return null;
  }
}

const WebsiteWizard: FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const draftWebsite = useSelector<IRootState, IWebsite>(state => state.website.entity);

  const isNextStepDisabled = useMemo(
    () => !isStepValid(activeStep, draftWebsite),
    [draftWebsite.url, draftWebsite.theme, activeStep],
  );

  return (
    <Wrapper>
      <Steps
        draftWebsite={draftWebsite}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <StepContent>
        {renderStep(activeStep, draftWebsite)}
      </StepContent>
      <ActionButtons>
        {activeStep !== ValidSteps.BASIC_INFO && (
          <PrevStepButton onClick={() => setActiveStep(activeStep - 1)}>
            <PrevStepIcon name={Icons.LeftArrow} />
            Prev Step
          </PrevStepButton>
        )}
        <NextStepButton onClick={() => setActiveStep(activeStep + 1)} disabled={isNextStepDisabled}>
          {activeStep === ValidSteps.PAGES ? (
            <span>Confirm</span>
          ) : (
            <>
              <span>Next step</span>
              <NextStepIcon name={Icons.RightArrow} />
            </>
          )}
        </NextStepButton>
      </ActionButtons>
    </Wrapper>
  );
};

export default WebsiteWizard;