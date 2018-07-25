import React from "react";
import { Provider } from "react-redux";

// common components
import Widget from "components/Widget";

// Application specific views
import Launcher from "./Launcher";
import Login from "./Login";
import Selectors from "./Selectors";
import Viewer from "./Diff";

// Redux store
import configureStore from "./store";

// Create our new store
const store = configureStore();

const UnAuthenticatedView = ({ token, children }) => {
  if (!token) {
    return children;
  }
  return null;
};

const AuthenticatedView = ({ name, shown, token, children }) => {
  if (shown && token) {
    return children;
  }
  return null;
};

export default class App extends React.Component {
  state = {
    launcherActive: false
  };

  handleLauncherClick = (show, closeAll) => () => {
    if (this.state.launcherActive) {
      this.setState({ launcherActive: false });
      return closeAll();
    }

    show({ name: "selectors" });
    this.setState({ launcherActive: true });
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Widget name="login">
            {({ token }) => (
              <UnAuthenticatedView token={token}>
                <Login />
              </UnAuthenticatedView>
            )}
          </Widget>
          <Widget name="selectors">
            {props => (
              <AuthenticatedView {...props}>
                <Selectors />
              </AuthenticatedView>
            )}
          </Widget>
          <Widget name="diff">
            {props => (
              <AuthenticatedView {...props}>
                <Viewer context={props.values && props.values.context} />
              </AuthenticatedView>
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
