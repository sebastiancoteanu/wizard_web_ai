import React, { FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import Icon from "app/modules/ui-kit/Icon";
import { Icons } from "app/modules/assets/fonts/icons";
import { IBlock } from "app/shared/model/block.model";

const PreStyledPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  min-width: 150px;
  background: ${({ theme }) => theme.colors.lightestGray};
  color: ${({ theme }) => theme.colors.ivory};
`;

const Placeholder = styled(PreStyledPlaceholder)<{ cssProps: CSSProperties}>(({ cssProps }) => ({
  ...cssProps
}));

const Image = styled.img<{ cssProps: CSSProperties}>(({ cssProps }) => ({
  ...cssProps
}));

interface Props extends Pick<IBlock, 'options'>{
  src?: string;
  isSelected: boolean;
}

const ImageWithPlaceholder: FC<Props> = ({ src, isSelected, options }) => {
  return src ? <Image src={src} cssProps={options?.cssProperties} /> : (
    <Placeholder cssProps={options?.cssProperties}>
      <Icon name={Icons.Picture} />
    </Placeholder>
  );
}

export default ImageWithPlaceholder;
