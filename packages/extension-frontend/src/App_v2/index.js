import React from 'react';
import { Provider } from 'react-redux';

// common components
import Widget, {
  ImplAuthenticated,
  ImplUnAuthenticated
} from 'components/Widget';

// Application specific views
import Launcher from './Launcher';
import Login from './Login';
import Window from './Window';

// Redux store
import configureStore from './store';

// Create our new store
const store = configureStore();

export default class App extends React.Component {
  state = {
    launcherActive: false
  };

  handleLauncherClick = (show, closeAll) => launcherState => {
    console.log('clicked');
    if (launcherState === this.state.launcherActive) {
      return;
    }

    if (!launcherState) {
      this.setState({ launcherActive: false });
      return closeAll();
    }

    show('window');
    this.setState({ launcherActive: true });
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Widget name="login" shouldRender={ImplUnAuthenticated}>
            <Login />
          </Widget>

          <Widget
            name="window"
            shouldRender={props => ImplAuthenticated(props) && props.shown}
          >
            {props => <Window />}
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
