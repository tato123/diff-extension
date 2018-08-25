import React from "react";
import { Provider } from "react-redux";

// common components
import Widget, {
  ImplAuthenticated,
  ImplUnAuthenticated
} from "components/Widget";

// Application specific views
import Launcher from "./Launcher";
import Login from "./Login";

// Redux store
import configureStore from "./store";
import Workspace from "./Workspace";
import Diff from "./Diff";
import Selectors from "./Selectors";

// import Loadable from "react-loadable";

// Create our new store
const store = configureStore();

// const Workspace = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "workspace-widget" */ "./Workspace"),
//   loading: () => <div />
// });

// const Diff = Loadable({
//   loader: () => import(/* webpackChunkName: "diff-widget" */ "./Diff"),
//   loading: () => <div />
// });

// const Selectors = Loadable({
//   loader: () => import(/* webpackChunkName: "selector-widget" */ "./Selectors"),
//   loading: () => <div />
// });

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
          <Widget name="login" shouldRender={ImplUnAuthenticated}>
            <Login />
          </Widget>
          <Widget
            name="selectors"
            shouldRender={props => ImplAuthenticated(props) && props.shown}
          >
            <Selectors showCount={launcherActive} />
          </Widget>
          <Widget
            name="diff"
            shouldRender={props => ImplAuthenticated(props) && props.shown}
          >
            {props => <Diff context={props.values && props.values.context} />}
          </Widget>
          <Widget
            name="workspace"
            shouldRender={props => ImplAuthenticated(props) && props.shown}
          >
            {props => (
              <Workspace context={props.values && props.values.context} />
            )}
          </Widget>
          <Widget name="launcher" shouldRender={ImplAuthenticated}>
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
