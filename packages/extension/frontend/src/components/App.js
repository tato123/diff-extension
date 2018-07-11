import React from "react";
import Launcher from "components/Launcher";

import Login from "components/Login";
import Selectors from "components/Selectors";
import Viewer from "components/Viewer";

import UserView from "components/UserView";

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <UserView name="login">{() => <Login />}</UserView>
        <UserView name="selectors">{() => <Selectors />}</UserView>
        <UserView name="DiffWindow">{() => <Viewer />}</UserView>
        <UserView name="launcher">{() => <Launcher />}</UserView>
      </div>
    );
  }
}
