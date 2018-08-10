import React from "react";
import { Provider } from "react-redux";

// common components
import Widget, { Unauthenticated, Authenticated } from "components/Widget";

// Application specific views
import Launcher from "./Launcher";
import Login from "./Login";
import Selectors from "./Selectors";
import Viewer from "./Diff";
import Workspace from "./Workspace";

// Redux store
import configureStore from "./store";

// Create our new store
const store = configureStore();

export default class App extends React.Component {
  state = {
    launcherActive: false
  };

  handleLauncherClick = (show, closeAll) => launcherState => {
    if (launcherState === this.state.launcherActive) {
      return;
    }

    if (!launcherState) {
      this.setState({ launcherActive: false });
      return closeAll();
    }

    show("selectors");
    this.setState({ launcherActive: true });
  };
  render() {
    const {
      state: { launcherActive }
    } = this;
    return (
      <Provider store={store}>
        <div>
          <Widget name="login">
            {({ token }) => (
              <Unauthenticated
                token={token}
                onChangeVisibility={this.visibleChange}
              >
                <Login />
              </Unauthenticated>
            )}
          </Widget>
          <Widget name="selectors">
            {props => (
              <Authenticated {...props}>
                <Selectors showCount={launcherActive} />
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
          <Widget name="workspace">
            {props => (
              <Authenticated {...props}>
                <Workspace context={props.values && props.values.context} />
              </Authenticated>
            )}
          </Widget>
          <Widget name="launcher">
            {({ token, closeAll, show }) =>
              token && (
                <Launcher onClick={this.handleLauncherClick(show, closeAll)} />
              )
            }
          </Widget>
        </div>
      </Provider>
    );
  }
}
