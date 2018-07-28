import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleBoundary } from "components/StyleBoundary";

const styles = {
  background: "linear-gradient(to right,#171a3a,#221f41)",
  padding: "20px",
  borderRadius: "16px"
};

export default class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <StyleBoundary>
        <div style={styles}>{this.props.children}</div>
      </StyleBoundary>
    );
  }
}
