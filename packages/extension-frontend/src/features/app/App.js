import React from 'react';
import PropTypes from 'prop-types';

import { StyleBoundary } from '@diff/shared-components';
import { MemoryRouter, Route } from 'react-router';
import { Provider } from 'react-redux';
import Launcher from '../launcher';
import UserSession from '../../components/UserSession';

const App = ({ store }) => (
  <Provider store={store}>
    <UserSession>
      <StyleBoundary>
        <div>
          <MemoryRouter>
            <Route component={Launcher} />
          </MemoryRouter>
        </div>
      </StyleBoundary>
    </UserSession>
  </Provider>
);

App.propTypes = {
  store: PropTypes.any.isRequired
};

export default App;
