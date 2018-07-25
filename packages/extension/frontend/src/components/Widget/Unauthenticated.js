import React from "react";

const UnAuthenticatedWidget = ({ token, children }) => {
  if (!token) {
    return children;
  }
  return null;
};

export default UnAuthenticatedWidget;
