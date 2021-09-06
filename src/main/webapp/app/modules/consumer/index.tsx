import React, { FC } from 'react';
import Header from "app/shared/layout/header/header";
import { RouteChildrenProps, Switch } from 'react-router-dom';
import DynamicPage from "app/modules/consumer/DynamicPage";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import PrivateRoute from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import PageLoader, { FullPageLoaderWrapper } from "app/modules/ui-kit/PageLoader";
import useCurrentVisitingWebsite from "app/common/useCurrentVisitingWebsite";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ThemeType } from "app/shared/model/enumerations/theme-type.model";
import lightTheme from "app/theme/lightTheme";
import darkTheme from "app/theme/darkTheme";

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.palette.text};
    background-color: ${({ theme }) => theme.palette.websiteBackground};
  }
`;

const Consumer: FC<RouteChildrenProps> = ({ match }) => {
  const { pages, loading, website } = useCurrentVisitingWebsite();

  if (!pages.length) {
    return null;
  }

  return (
    <ThemeProvider theme={website?.theme === ThemeType.LIGHT ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header />
      {loading ? (
        <FullPageLoaderWrapper>
          <PageLoader />
        </FullPageLoaderWrapper>
      ) : (
        <Switch>
          {pages.map((page) => page.isRestricted ? (
            <PrivateRoute path={`${match.url}/${page.url}`} hasAnyAuthorities={[AUTHORITIES.USER]}>
              <DynamicPage page={page} />
            </PrivateRoute>
          ) : (
            <ErrorBoundaryRoute path={`${match.url}/${page.url}`} key={page.id} exact>
              <DynamicPage page={page} />
            </ErrorBoundaryRoute>
          ))}
        </Switch>
      )}
    </ThemeProvider>
  );
};

export default Consumer;
