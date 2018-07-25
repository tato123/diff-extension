import React from "react";
import { Provider } from "react-redux";

// common components
import Widget, { Unauthenticated, Authenticated } from "components/Widget";

// Application specific views
import Launcher from "./Launcher";
import Login from "./Login";
import Selectors from "./Selectors";
import Viewer from "./Diff";

// Redux store
import configureStore from "./store";

// Create our new store
const store = configureStore();

export default class App extends React.Component {
  state = {
    launcherActive: false
  };

  handleLauncherClick = (show, closeAll) => () => {
    if (this.state.launcherActive) {
      this.setState({ launcherActive: false });
      return closeAll();
    }

    show("selectors");
    this.setState({ launcherActive: true });
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Widget name="login">
            {({ token }) => (
              <Unauthenticated token={token}>
                <Login />
              </Unauthenticated>
            )}
          </Widget>
          <Widget name="selectors">
            {props => (
              <Authenticated {...props}>
                <Selectors />
              </Authenticated>
            )}
          </Widget>
          <Widget name="diff">
            {props => (
              <Authenticated {...props}>
                <Viewer context={props.values && props.values.context} />
              </Authenticated>
            )}
          </Widget>
          <Widget name="launcher" static>
            {props => (
              <Launcher
                onClick={this.handleLauncherClick(props.show, props.closeAll)}
              />
            )}
          </Widget>
        </div>
      </Provider>
    );
  }
}
