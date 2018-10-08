import React from 'react';
import PropTypes from 'prop-types';

import { StyleBoundary } from '@diff/shared-components';
import { MemoryRouter, Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import UserSessionProvider from '../UserSessionProvider';
import Launcher from '../Launcher';

const App = ({ store }) => (
  <Provider store={store}>
    <UserSessionProvider>
      <StyleBoundary>
        <MemoryRouter>
          <Switch>
            <Route exact path="/inspect" render={() => <div />} />
            <Route path="/" component={Launcher} />
          </Switch>
        </MemoryRouter>
      </StyleBoundary>
    </UserSessionProvider>
  </Provider>
);

App.propTypes = {
  store: PropTypes.any.isRequired
};

export default App;
