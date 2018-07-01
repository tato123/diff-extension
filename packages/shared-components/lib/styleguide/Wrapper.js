import React, { Component } from "react";
import PropTypes from "prop-types";
import { Widget } from "components/Widget";

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
      <Widget>
        <div style={styles}>{this.props.children}</div>
      </Widget>
    );
  }
}
