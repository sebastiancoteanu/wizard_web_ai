import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  flex: 0 0 auto;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.lightestGray};
  border-top: 3px solid ${({ theme }) => `${theme.colors.lightGray}bd`};
  border-radius: 50%;
  width: 100%;
  animation: ${spin} 1s linear infinite;
`;

interface Props {
  className?: string;
}

const Spinner: FC<Props> = ({ className }) => (
  <Wrapper className={className}>
    <StyledSpinner />
  </Wrapper>
);

export default Spinner;