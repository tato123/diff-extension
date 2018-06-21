import React from "react";
import PropTypes from "prop-types";
import ShadowDom from "react-shadow";
import styled, { StyleSheetManager } from "styled-components";

const H1 = styled.h1`
  color: purple;
`;

export default class Widget extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = { div: null };

  ref = div => {
    this.setState({ div });
  };

  render() {
    const {
      ref,
      state: { div }
    } = this;

    return (
      <ShadowDom>
        <div>
          <div ref={ref}>
            {div && (
              <StyleSheetManager target={div}>
                {React.Children.only(this.props.children)}
              </StyleSheetManager>
            )}
          </div>
        </div>
      </ShadowDom>
    );
  }
}
