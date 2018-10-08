import React from 'react';
import PropTypes from 'prop-types';

import { StyleBoundary } from '@diff/shared-components';
import { MemoryRouter, Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import UserSessionProvider from '../UserSessionProvider';
import Launcher from '../Launcher';

const App = ({ store }) => (
  <Provider store={store}>
    <MemoryRouter>
      <UserSessionProvider>
        <StyleBoundary>
          <Switch>
            <Route exact path="/inspect" render={() => <div />} />
            <Route component={Launcher} />
          </Switch>
        </StyleBoundary>
      </UserSessionProvider>
    </MemoryRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.any.isRequired
};

export default App;
