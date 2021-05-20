import React, { FC, useMemo, useState } from 'react';
import { ValidSteps } from "app/modules/website-wizard/types";
import styled from "styled-components";
import Steps from "app/modules/website-wizard/Steps";
import BaseInfoStep from "app/modules/website-wizard/BaseInfoStep";
import { IWebsite } from "app/shared/model/website.model";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import ThemeStep from "app/modules/website-wizard/ThemeStep";
import { isStepValid } from "app/modules/website-wizard/utils";
import PageStep from "app/modules/website-wizard/pages-step";
import ActionButtons from "app/modules/website-wizard/ActionButtons";
import { IAppUser } from "app/shared/model/app-user.model";
import { createEntity } from "app/entities/website/website.reducer";

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

const steps = [ValidSteps.BASIC_INFO, ValidSteps.THEME, ValidSteps.PAGES];

const renderStep = (step: ValidSteps, draftWebsite: IWebsite) => {
  switch (step) {
    case ValidSteps.BASIC_INFO:
      return <BaseInfoStep url={draftWebsite.url} />;
    case ValidSteps.THEME:
      return <ThemeStep theme={draftWebsite.theme} />;
    case ValidSteps.PAGES:
      return <PageStep pages={draftWebsite.pages} baseUrl={draftWebsite.url} />;
    default:
      return null;
  }
}

interface Props {
  userId: IAppUser['id'];
}

const WebsiteWizard: FC<Props> = ({ userId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const draftWebsite = useSelector<IRootState, IWebsite>(state => state.website.entity);

  const isNextStepDisabled = useMemo(
    () => !isStepValid(activeStep, draftWebsite),
    [draftWebsite.url, draftWebsite.theme, activeStep],
  );

  const handleOptionsConfirm = () => {
    dispatch(createEntity({ ...draftWebsite, creator: { id: userId } }));
  }

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
      <ActionButtons
        isNextStepDisabled={isNextStepDisabled}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onOptionsConfirm={handleOptionsConfirm}
      />
    </Wrapper>
  );
};

export default WebsiteWizard;