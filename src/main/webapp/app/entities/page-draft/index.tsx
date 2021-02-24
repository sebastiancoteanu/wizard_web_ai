import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PageDraft from './page-draft';
import PageDraftDetail from './page-draft-detail';
import PageDraftUpdate from './page-draft-update';
import PageDraftDeleteDialog from './page-draft-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PageDraftUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PageDraftUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PageDraftDetail} />
      <ErrorBoundaryRoute path={match.url} component={PageDraft} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PageDraftDeleteDialog} />
  </>
);

export default Routes;
