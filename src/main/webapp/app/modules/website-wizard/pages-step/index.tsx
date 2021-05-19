import React, { FC, useState } from 'react';
import { IPage } from "app/shared/model/page.model";
import styled from "styled-components";
import EditablePage from "app/modules/website-wizard/pages-step/EditablePage";
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

const PagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
    background: ${({ theme }) => theme.palette.neutral.white};;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.ivory};;
  }
`;

interface Props {
  pages: IWebsite['pages'];
  baseUrl: string;
}

const PageStep: FC<Props> = ({ pages = [], baseUrl }) => {
  const [newPageUrl, setNewPageUrl] = useState('');
  const dispatch = useDispatch();

  const createNewPage = () => {
    dispatch(setDraftWebsite({ pages: [...pages, { url: newPageUrl }] }));
    setNewPageUrl('');
  }

  const handleEditPage = (value: string, index: number) => {
    const newPageList = [...pages];
    newPageList[index].url = value;
  }

  return (
    <Wrapper>
      <Title>Add your first pages</Title>
      <EditablePage
        value={newPageUrl}
        name="newPageUrl"
        placeholder="Your page url"
        isEditOnly
        handleChange={(value) => setNewPageUrl(value)}
        onSave={createNewPage}
      />
      <PagesWrapper>
        {pages?.map((page, index) => (
          <EditablePage
            key={index}
            value={page.url}
            name={`${page}-${index}`}
            placeholder="Page URL"
            handleChange={(value) => handleEditPage(value, index)}
          />
        ))}
      </PagesWrapper>
    </Wrapper>
  )
};

export default PageStep;
