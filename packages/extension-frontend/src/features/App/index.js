import React from 'react';
import { Provider } from 'react-redux';

import { StyleBoundary } from '@diff/shared-components';
import Launcher from '../Launcher';
import ControlPanel from '../Window';

import configureStore from '../../store';

// Create our new store
const store = configureStore();

export default class App extends React.Component {
  state = {
    open: false
  };

  handleOnClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  render() {
    const {
      state: { open },
      handleOnClick
    } = this;
    return (
      <Provider store={store}>
        <StyleBoundary>
          <div>
            <Launcher onClick={handleOnClick} />
            <ControlPanel open={open} />
          </div>
        </StyleBoundary>
      </Provider>
    );
  }
}
