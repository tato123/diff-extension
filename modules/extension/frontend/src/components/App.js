import React from "react";
import Launcher from "components/Launcher";
import { MemoryRouter as Router, Switch, Route } from "react-router";
import PrivateRoute from "components/Routes/PrivateRoute";
import Login from "components/Login";
import Selectors from "components/Selectors";

const Placeholder = () => <div />;

export default class App extends React.Component {
  onClick = () => {
    console.log("clicked");
  };

  render() {
    const { onClick } = this;

    return (
      <div>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/" component={Placeholder} />
              <PrivateRoute path="/selectors" component={Selectors} />
            </Switch>
            <Launcher onClick={onClick} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}
