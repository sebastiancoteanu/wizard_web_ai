import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const ErrorBoundaryRoute = ({ component: Component, children, ...rest }: RouteProps) => {
  const encloseInErrorBoundary = props => (
    <ErrorBoundary>
      {children ? (
        <>{children}</>
      ) : (
        <Component {...props} />
      )}
    </ErrorBoundary>
  );

  if (!children && !Component) throw new Error(`A component needs to be specified for path ${(rest as any).path}`);

  return <Route {...rest} render={encloseInErrorBoundary} />;
};

export default ErrorBoundaryRoute;
