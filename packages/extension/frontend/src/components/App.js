import React from "react";
import Launcher from "components/Launcher";
import Login from "components/Login";
import Selectors from "components/Selectors";
import Viewer from "components/Viewer";

import Widget from "components/Widget";

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
        <Widget name="launcher">
          {props => (
            <AuthenticatedView {...props}>
              <Launcher
                onClick={this.handleLauncherClick(props.show, props.closeAll)}
              />
            </AuthenticatedView>
          )}
        </Widget>
      </div>
    );
  }
}
