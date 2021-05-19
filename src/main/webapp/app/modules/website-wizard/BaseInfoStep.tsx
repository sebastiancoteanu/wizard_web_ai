import React, { ChangeEvent, FC, useState } from 'react';
import styled from "styled-components";
import { IWebsite } from "app/shared/model/website.model";
import { useDispatch } from "react-redux";
import { setDraftWebsite } from "app/entities/website/website.reducer";
import EditableField from "app/modules/website-wizard/common/EditableField";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.primary.main};
  padding-bottom: 16px;
`;

const BaseInfoStep: FC<Pick<IWebsite, 'url'>> = ({ url = '' }) => {
  const dispatch = useDispatch();

  const handleChange = (_, value) => {
    dispatch(setDraftWebsite({ url: value }));
  };

  return (
    <Wrapper>
      <Title>Basic info about your website</Title>
      <EditableField
        value={url}
        name="url"
        handleChange={handleChange}
        label="Website URL"
        placeholder="my-site.teacher"
        valuePreview={`http://${url}.com`}
      />
    </Wrapper>
  );
};

export default BaseInfoStep;
