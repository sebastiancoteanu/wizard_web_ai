import React, { ChangeEvent, FC, useState } from 'react';
import styled from "styled-components";
import { IWebsite } from "app/shared/model/website.model";
import { useDispatch } from "react-redux";
import { setDraftWebsite } from "app/entities/website/website.reducer";
import { ThemeType } from "app/shared/model/enumerations/theme-type.model";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import LIGHT_MODE from '../assets/images/light_mode.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import DARK_MODE from '../assets/images/dark_mode.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.primary.main};
  padding-bottom: 16px;
`;

const Themes = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ThemeSelection = styled.label<{ isSelected: boolean }>`
  position: relative;
  height: 200px;
  width: 200px;
  margin-bottom: 0;
  cursor: pointer;
  border: 1px solid ${({ theme, isSelected }) => isSelected ? theme.palette.primary.main : 'transparent' };
  overflow: hidden;
  border-radius: 4px;
`;

const ThemeImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  cursor: pointer;
`;

const ThemeStep: FC<Pick<IWebsite, 'theme'>> = ({ theme = '' }) => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDraftWebsite({ theme: e.target.value as ThemeType }));
  };

  return (
    <Wrapper>
      <Title>Select a theme for your website</Title>
      <Themes>
        <ThemeSelection isSelected={theme === ThemeType.LIGHT}>
          <HiddenInput type="radio" name="theme" value={ThemeType.LIGHT} onChange={handleChange} />
          <ThemeImage src={LIGHT_MODE} />
        </ThemeSelection>
        <ThemeSelection isSelected={theme === ThemeType.DARK}>
          <HiddenInput type="radio" name="theme" value={ThemeType.DARK} onChange={handleChange} />
          <ThemeImage src={DARK_MODE} />
        </ThemeSelection>
      </Themes>
    </Wrapper>
  );
};

export default ThemeStep;
