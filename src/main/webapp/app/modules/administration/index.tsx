import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from './user-management';
import Logs from './logs/logs';
import Health from './health/health';
import Metrics from './metrics/metrics';
import Configuration from './configuration/configuration';
import Audits from './audits/audits';
import Docs from './docs/docs';
import Header from "app/shared/layout/header/header";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
`;

const Routes = ({ match }) => (
  <>
    <Header />
    <Container>
        <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
        <ErrorBoundaryRoute exact path={`${match.url}/health`} component={Health} />
        <ErrorBoundaryRoute exact path={`${match.url}/metrics`} component={Metrics} />
        <ErrorBoundaryRoute exact path={`${match.url}/docs`} component={Docs} />
        <ErrorBoundaryRoute exact path={`${match.url}/configuration`} component={Configuration} />
        <ErrorBoundaryRoute exact path={`${match.url}/audits`} component={Audits} />
        <ErrorBoundaryRoute exact path={`${match.url}/logs`} component={Logs} />
    </Container>
  </>
);

export default Routes;
