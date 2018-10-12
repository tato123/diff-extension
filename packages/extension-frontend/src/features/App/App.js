import React from 'react';
import PropTypes from 'prop-types';

import { StyleBoundary } from '@diff/shared-components';
import { MemoryRouter, Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import Launcher from '../Launcher';
import UserSession from '../../components/UserSession';

const App = ({ store }) => (
  <Provider store={store}>
    <UserSession>
      <StyleBoundary>
        <MemoryRouter>
          <Switch>
            <Route exact path="/inspect" render={() => <div />} />
            <Route path="/" component={Launcher} />
          </Switch>
        </MemoryRouter>
      </StyleBoundary>
    </UserSession>
  </Provider>
);

App.propTypes = {
  store: PropTypes.any.isRequired
};

export default App;
