import React from "react";
import Launcher from "components/Launcher";
import { MemoryRouter as Router, Switch, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Login from "components/Login";

const AuthenticatedRoutes = () => <div>hello world</div>;

const Routes = () => (
  <Router>
    <React.Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={AuthenticatedRoutes} />
      </Switch>
      <Launcher />
    </React.Fragment>
  </Router>
);

export default Routes;
