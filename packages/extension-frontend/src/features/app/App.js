import React from 'react';
import PropTypes from 'prop-types';

import { StyleBoundary } from '@diff/shared-components';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import Launcher from '../launcher';
import UserSession from '../../components/UserSession';

const App = ({ store, history }) => (
  <Provider store={store}>
    <UserSession>
      <StyleBoundary>
        <div>
          <Router history={history}>
            <Route component={Launcher} />
          </Router>
        </div>
      </StyleBoundary>
    </UserSession>
  </Provider>
);

App.propTypes = {
  store: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired
};

export default App;
