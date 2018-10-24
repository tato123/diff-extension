import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import Layout from '../../components/Layout';

import Signup from './Signup';
import Account from './Account';
import Login from './Login';

const SubPath = ({ children }) => <React.Fragment>{children}</React.Fragment>;

SubPath.propTypes = {
  children: PropTypes.node.isRequired
};

const App = () => (
  <Layout client>
    <Router>
      <SubPath path="/app">
        <Signup path="signup" />
        <Account path="account" />
        <Login path="login" />
      </SubPath>
    </Router>
  </Layout>
);

export default App;
