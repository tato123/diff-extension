import React from 'react';

import { StyleBoundary } from '@diff/shared-components';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import UserSessionProvider from '../UserSessionProvider';
import Routes from './Routes';

const App = ({ store }) => (
  <Provider store={store}>
    <MemoryRouter>
      <UserSessionProvider>
        <StyleBoundary>
          <Routes />
        </StyleBoundary>
      </UserSessionProvider>
    </MemoryRouter>
  </Provider>
);

export default App;
