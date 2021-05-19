import React, { ChangeEvent, FC, useState } from 'react';
import styled from "styled-components";
import { IWebsite } from "app/shared/model/website.model";
import { useDispatch } from "react-redux";
import { setDraftWebsite } from "app/entities/website/website.reducer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.primary.main};
  padding-bottom: 16px;
`;

const WebsiteUrl = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 12px;
  font-weight: bold;
`;

const Input = styled.input`
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.lightestGray};
  background: transparent;
  color: ${({ theme }) => theme.colors.darkestGray};
  padding: 8px 16px;
  margin-bottom: 4px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.lightestGray};
  }

  &:focus {
    outline: none;
  }
`;

const UrlPreview = styled.div`
  font-size: 12px;
  text-transform: lowercase;
`;

const BaseInfoStep: FC<Pick<IWebsite, 'url'>> = ({ url = '' }) => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDraftWebsite({ url: e.target.value }));
  };

  return (
    <Wrapper>
      <Title>Basic info about your website</Title>
      <WebsiteUrl>
        <Label>Website URL</Label>
        <Input value={url} placeholder="my-site.teacher" onChange={handleChange} spellCheck="false" />
        <UrlPreview>{`http://${url}.com`}</UrlPreview>
      </WebsiteUrl>
    </Wrapper>
  );
};

export default BaseInfoStep;
