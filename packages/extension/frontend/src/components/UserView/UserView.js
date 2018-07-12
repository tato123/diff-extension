import React from "react";
import PropTypes from "prop-types";
import { omit } from "lodash";

/* eslint-disable */
export default class UserView extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    shown: PropTypes.bool,
    token: PropTypes.string,
    requiresAuth: PropTypes.bool,
    name: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    context: PropTypes.object
  };

  static defaultProps = {
    shown: false,
    token: null,
    requiresAuth: false,
    name: null
  };

  render() {
    const childProps = omit(this.props, ["children"]);
    return this.props.children(childProps);
  }
}
