import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/inspect" />
      <Route path="/select" />
      <Redirect to="/select" />
    </Switch>
  </React.Fragment>
);

export default Routes;
