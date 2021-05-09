import React, { FC } from 'react';
import styled from "styled-components";
import Icon from "app/modules/ui-kit/Icon";
import { Icons } from "app/modules/assets/fonts/icons";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  min-width: 150px;
  background: ${({ theme }) => theme.colors.lightestGray};
  color: ${({ theme }) => theme.colors.ivory};
`;

const Image = styled.img`
  
`;

interface Props {
  src?: string;
  isSelected: boolean;
}

const ImageWithPlaceholder: FC<Props> = ({ src, isSelected }) => (
  <Wrapper>
    {src ? <Image src={src} /> : (
      <Placeholder>
        <Icon name={Icons.Picture} />
      </Placeholder>
    )}
  </Wrapper>
);

export default ImageWithPlaceholder;
