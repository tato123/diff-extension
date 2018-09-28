import React from 'react';

// common components
import Widget, {
  ImplAuthenticated,
  ImplUnAuthenticated
} from 'components/Widget';

// Application specific views
import Launcher from './Launcher';
import Login from './Login';
import Window from './Window';

export default class App extends React.Component {
  state = {
    launcherActive: false
  };

  handleLauncherClick = (show, closeAll) => launcherState => {
    const {
      state: { launcherActive }
    } = this;

    console.log('clicked');
    if (launcherState === launcherActive) {
      return;
    }

    if (!launcherState) {
      this.setState({ launcherActive: false });
      closeAll();
      return;
    }

    show('window');
    this.setState({ launcherActive: true });
  };

  render() {
    return (
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
    );
  }
}
