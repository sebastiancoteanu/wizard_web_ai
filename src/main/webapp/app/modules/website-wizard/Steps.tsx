import React, { FC, Fragment } from 'react';
import { ValidSteps } from "app/modules/website-wizard/types";
import styled, { css } from "styled-components";
import BorderButton from "app/modules/ui-kit/BorderButton";
import { isStepValid } from "app/modules/website-wizard/utils";
import { IWebsite } from "app/shared/model/website.model";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: ${({theme}) => theme.colors.lightIvory};
  padding: 60px 100px;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors.ivory};
`;

const StepWrapper = styled.div`
  position: relative;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Step = styled(BorderButton)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  font-size: 20px;
  width: 45px;
  height: 45px;
  
  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.neutral.white};
  `}
`;

const StepConnector = styled.div`
  height: 2px;
  flex: 1;
  background: ${({ theme }) => theme.palette.primary.main};
  margin: 0 14px;
`;

const StepCaption = styled.div`
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const captions = {
  [ValidSteps.BASIC_INFO]: 'Basic info',
  [ValidSteps.THEME]: 'Appearance',
  [ValidSteps.PAGES]: 'Pages',
};

interface Props {
  steps: ValidSteps[];
  activeStep: number;
  setActiveStep: (_: number) => void;
  draftWebsite: IWebsite;
}

const Steps: FC<Props> = ({ steps, activeStep, setActiveStep, draftWebsite }) => (
  <Wrapper>
    {steps.map((step, index) => (
      <Fragment key={step}>
        {index > 0 && <StepConnector />}
        <StepWrapper>
          <Step
            isActive={activeStep === step}
            onClick={() => setActiveStep(step)}
            disabled={index !== 0 && !isStepValid(step, draftWebsite)}
          >
            {index + 1}
          </Step>
          <StepCaption>{captions[step]}</StepCaption>
        </StepWrapper>
      </Fragment>
    ))}
  </Wrapper>
);

export default Steps;
