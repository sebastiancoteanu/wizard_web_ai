import React, { FC } from 'react';
import { Icons } from "app/modules/assets/fonts/icons";
import styled from "styled-components";
import PrimaryButton from "app/modules/ui-kit/PrimaryButton";
import Icon from "app/modules/ui-kit/Icon";
import Spinner from "app/modules/ui-kit/Spinner";

const Loader = styled(Spinner)`
  margin-left: -5px;
  margin-right: 5px;
`;

const NextStepIcon = styled(Icon)`
  margin-left: 4px;
  margin-right: -4px;
  transition: all 0.1s ease-in;
`;

const Wrapper = styled(PrimaryButton)`
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

interface Props {
  disabled: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const NextStepButton: FC<Props> = ({ disabled, isLastStep, isLoading, onClick }) => {
  const ConfirmContent = (
    <>
      {isLoading && <Loader />}
      <span>Confirm</span>
    </>
  );

  return (
    <Wrapper onClick={onClick} disabled={disabled}>
      {isLastStep ? ConfirmContent : (
        <>
          <span>Next step</span>
          <NextStepIcon name={Icons.RightArrow}/>
        </>
      )}
    </Wrapper>
  );
};

export default NextStepButton;
