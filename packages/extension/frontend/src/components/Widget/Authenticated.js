import React from "react";

const AuthenticatedWidget = ({ name, shown, token, children }) => {
  if (shown && token) {
    return children;
  }
  return null;
};

export default AuthenticatedWidget;
