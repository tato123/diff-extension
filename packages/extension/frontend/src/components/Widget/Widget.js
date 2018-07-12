import React from "react";
import PropTypes from "prop-types";
import { omit } from "lodash";

export default class UserView extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    shown: PropTypes.bool,
    token: PropTypes.string,
    requiresAuth: PropTypes.bool,
    name: PropTypes.string,
    context: PropTypes.object,
    show: PropTypes.func.isRequired,
    closeAll: PropTypes.func.isRequired
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
