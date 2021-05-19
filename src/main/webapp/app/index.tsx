import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import initStore from './config/store';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './shared/reducers/authentication';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';
import { loadIcons } from './config/icon-loader';
import lightTheme from "app/theme/lightTheme";
import {ThemeProvider} from "styled-components";
import AppGlobalStyle from "app/modules/ui-kit/AppGlobalStyle";

const store = initStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AppGlobalStyle />
          <div>
            <Component />
          </div>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>,
    rootEl,
  );

render(AppComponent);
