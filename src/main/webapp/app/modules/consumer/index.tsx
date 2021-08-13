import React, { FC } from 'react';
import Header from "app/shared/layout/header/header";
import { RouteChildrenProps, Switch } from 'react-router-dom';
import DynamicPage from "app/modules/consumer/DynamicPage";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import PrivateRoute from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import PageLoader, { FullPageLoaderWrapper } from "app/modules/ui-kit/PageLoader";
import useCurrentVisitingWebsite from "app/common/useCurrentVisitingWebsite";

const Consumer: FC<RouteChildrenProps> = ({ match }) => {
  const { pages, loading } = useCurrentVisitingWebsite();

  if (!pages.length) {
    return null;
  }

  console.log(match.url);

  return (
    <>
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
    </>
  );
};

export default Consumer;
