import React from "react";

const AuthenticatedWidget = ({ name, shown, token, children }) => {
  if (token) {
    return children;
  }
  return null;
};

export default AuthenticatedWidget;
