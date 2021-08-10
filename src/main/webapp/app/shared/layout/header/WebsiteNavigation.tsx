import React, { FC } from 'react';
import useCurrentVisitingWebsite from "app/common/useCurrentVisitingWebsite";
import styled from "styled-components";
import { Link, useParams, useLocation } from "react-router-dom";
import { IWebsite } from "app/shared/model/website.model";

const Wrapper = styled.div`
  padding: 0 8px;
`;

const Page = styled(Link)<{ isActive: boolean }>`
  color: ${({ theme }) => theme.colors.darkestGray};
  margin-right: 8px;
  font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};

  &:hover, &:active, &:visited {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.darkestGray};
  }
  
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

interface Params {
  websiteUrl: IWebsite['url'];
}

const WebsiteNavigation: FC = () => {
  const { websiteUrl } = useParams<Params>();
  const { pages, loading } = useCurrentVisitingWebsite();
  const location = useLocation();

  if (!pages.length || loading) {
    return null;
  }

  return (
    <Wrapper>
      {pages.map((page) => (
        <Page
          key={page.id}
          to={`/${websiteUrl}/${page.url}`}
          isActive={`/${websiteUrl}/${page.url}` === location.pathname}
        >
          {page.url}
        </Page>
      ))}
    </Wrapper>
  );
};

export default WebsiteNavigation;
