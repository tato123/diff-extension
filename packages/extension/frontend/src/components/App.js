import React from "react";
import Launcher from "components/Launcher";

import Login from "components/Login";
import Selectors from "components/Selectors";
import Viewer from "components/Viewer";

import UserView from "components/UserView";

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

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <UserView name="login">
          {({ token }) => (
            <UnAuthenticatedView token={token}>
              <Login />
            </UnAuthenticatedView>
          )}
        </UserView>
        <UserView name="selectors">
          {props => (
            <AuthenticatedView {...props}>
              <Selectors />
            </AuthenticatedView>
          )}
        </UserView>
        <UserView name="diff">
          {props => (
            <AuthenticatedView {...props}>
              <Viewer context={props.values && props.values.context} />
            </AuthenticatedView>
          )}
        </UserView>
        <UserView name="launcher">
          {props => (
            <AuthenticatedView {...props}>
              <Launcher onClick={() => props.toggle("selectors")} />
            </AuthenticatedView>
          )}
        </UserView>
      </div>
    );
  }
}
