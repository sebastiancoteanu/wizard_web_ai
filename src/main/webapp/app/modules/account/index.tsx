import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
import Password from './password/password';
import Header from "app/shared/layout/header/header";

const Routes = ({ match }) => (
  <>
    <Header />
    <div className="mt-4">
      <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings} />
      <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
    </div>
  </>
);

export default Routes;
