import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Website from './website';
import WebsiteDetail from './website-detail';
import WebsiteUpdate from './website-update';
import WebsiteDeleteDialog from './website-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WebsiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WebsiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WebsiteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Website} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WebsiteDeleteDialog} />
  </>
);

export default Routes;
