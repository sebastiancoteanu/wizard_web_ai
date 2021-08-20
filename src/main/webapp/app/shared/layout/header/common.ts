import styled from 'styled-components';
import BaseButton from 'app/modules/ui-kit/BaseButton';

export const ActionButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.darkestGray};

  &:not(:first-child) {
    margin-left: 8px;
  }
`;
