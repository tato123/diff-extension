import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({ token, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  token: PropTypes.string,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

PrivateRoute.defaultProps = {
  token: null
};

const mapStateToProps = ({ user: { access_token: token } }) => ({ token });

export default connect(mapStateToProps)(PrivateRoute);
