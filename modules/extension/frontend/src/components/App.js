import React from "react";
import Launcher from "components/Launcher";
import { MemoryRouter as Router, Switch, Route } from "react-router";
import PrivateRoute from "components/Routes/PrivateRoute";
import Login from "components/Login";
import Selectors from "components/Selectors";
import styled, { ThemeProvider } from "styled-components";
import theme from "./Theme";
import "components/Theme/fonts/inter-ui/inter-ui.css";

export default class App extends React.Component {
  onClick = ({ history }) => () => {
    history.push("/selectors");
  };

  render() {
    const { onClick } = this;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Router>
            <React.Fragment>
              <Route
                render={renderProps => (
                  <React.Fragment>
                    <Switch>
                      <Route exact path="/login" component={Login} />
                      <PrivateRoute path="/selectors" component={Selectors} />
                      <PrivateRoute exact path="/" component={() => <div />} />
                    </Switch>
                    <Launcher onClick={this.onClick(renderProps)} />
                  </React.Fragment>
                )}
              />
            </React.Fragment>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}