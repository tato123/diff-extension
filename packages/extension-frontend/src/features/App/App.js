import React from 'react';

import { StyleBoundary } from '@diff/shared-components';
import Launcher from '../Launcher';
import ControlPanel from '../Window';
import UserSessionProvider from '../UserSessionProvider';

export default class App extends React.PureComponent {
  render() {
    return (
      <UserSessionProvider>
        <StyleBoundary>
          <Launcher />
          <ControlPanel />
        </StyleBoundary>
      </UserSessionProvider>
    );
  }
}
