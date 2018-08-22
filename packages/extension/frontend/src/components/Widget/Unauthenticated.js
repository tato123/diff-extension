import React from "react";
import _ from "lodash";

const UnAuthenticatedWidget = ({ token, children }) => {
  if (_.isNil(token)) {
    return children;
  }
  return null;
};

export default UnAuthenticatedWidget;
