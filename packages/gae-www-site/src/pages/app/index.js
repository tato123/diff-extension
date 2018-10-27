import React from 'react';
import { Router } from '@reach/router';
import { StyleBoundary } from '@diff/shared-components';
import Layout from '../../components/Layout';

import Account from './Account';
import Login from './Login';
import serviceworker from '../../utils/serviceworker';

import PrivateRoute from '../../components/PrivateRoute';
import UserContext, { user } from '../../utils/auth';
import Header from './Header';

serviceworker.deregister();

const App = () => (
  <StyleBoundary shadowDom={false}>
    <Layout Header={Header}>
      <UserContext.Provider value={user}>
        <Router>
          <PrivateRoute default component={Account} path="/app/account" />
          <Login path="/app/login" />
        </Router>
      </UserContext.Provider>
    </Layout>
  </StyleBoundary>
);

export default App;
