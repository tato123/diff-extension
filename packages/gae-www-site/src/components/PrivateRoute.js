import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import UserContext from '../utils/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => (
  <UserContext.Consumer>
    {value => {
      if (!value.isLoggedIn() && location.pathname !== `/app/login`) {
        // If we’re not logged in, redirect to the home page.
        navigate(`/app/login`);
        return null;
      }

      return <Component {...rest} />;
    }}
  </UserContext.Consumer>
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};

PrivateRoute.contextType = UserContext;

export default PrivateRoute;
