import React, { FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import Icon from "app/modules/ui-kit/Icon";
import { Icons } from "app/modules/assets/fonts/icons";
import { IBlock } from "app/shared/model/block.model";
import MediaChange from "app/modules/editor/media-change";

const MediaSelect = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.1s ease-in;
`;

const StyledWrapper = styled.div`
  position: relative;

  &:hover {
    ${MediaSelect} {
      opacity: 1;
    }
  }
`;

const Wrapper = styled(StyledWrapper)<{ cssProps: CSSProperties}>(({ cssProps }) => ({
  ...cssProps,
}));

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
  ...cssProps,
}));

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

interface Props extends Pick<IBlock, 'options' | 'id'>{
  src?: string;
  isSelected: boolean;
  index?: number;
}

const ImageWithPlaceholder: FC<Props> = ({
  src,
  isSelected,
  options,
  index = 0,
  id,
}) => {
  return (
    <Wrapper cssProps={options?.cssProperties}>
      {src ? <Image src={src} /> : (
        <Placeholder cssProps={options?.cssProperties}>
          <Icon name={Icons.Picture} />
        </Placeholder>
      )}
      {isSelected && (
        <MediaSelect>
          <MediaChange index={index}/>
        </MediaSelect>
      )}
    </Wrapper>
  )
}

export default ImageWithPlaceholder;
