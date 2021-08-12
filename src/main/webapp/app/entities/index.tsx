import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AppUser from './app-user';
import Website from './website';
import Page from './page';
import PageDraft from './page-draft';
import Block from './block';
import Header from "app/shared/layout/header/header";
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Header />
    <div className="p-4">
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}app-user`} component={AppUser} />
        <ErrorBoundaryRoute path={`${match.url}website`} component={Website} />
        <ErrorBoundaryRoute path={`${match.url}page`} component={Page} />
        <ErrorBoundaryRoute path={`${match.url}page-draft`} component={PageDraft} />
        <ErrorBoundaryRoute path={`${match.url}block`} component={Block} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  </div>
);

export default Routes;
