import React, { FC } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkestGray};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Warning = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const CategoryWarning = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: bold;
`;

interface Props {
  warnings: string[]
}

const warningParser = (warning: string, idx: number, warningsNo) => {
  return `${idx === 0 ? ' ' : ''} ${warning}${idx !== warningsNo - 1 ? ',' : ' '}`;
}

const Warnings: FC<Props> = ({ warnings }) => {
  return (
    <Wrapper>
      <Warning>
        Your content might be:
        {warnings.map((warning, idx) => (
          <CategoryWarning key={idx}>{warningParser(warning, idx, warnings.length)}</CategoryWarning>
        ))}
        to some people.
      </Warning>
      <Warning>Please check again!</Warning>
    </Wrapper>
  )
};

export default Warnings;