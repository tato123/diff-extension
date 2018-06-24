import React from "react";
import PropTypes from "prop-types";
import ShadowDom from "react-shadow";
import styled, { StyleSheetManager } from "styled-components";

const H1 = styled.h1`
  color: purple;
`;

const View = styled.div`
  * {
    font-family: "Inter UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default class Widget extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shadowDom: PropTypes.bool
  };

  static defaultProps = {
    shadowDom: true
  };

  state = { div: null };

  ref = div => {
    this.setState({ div });
  };

  innerContent = () => {
    const {
      ref,
      state: { div },
      props: { shadowDom }
    } = this;
    return (
      <div>
        <div ref={ref}>
          {div && (
            <StyleSheetManager target={div}>
              <View>{React.Children.only(this.props.children)}</View>
            </StyleSheetManager>
          )}
        </div>
      </div>
    );
  };

  render() {
    const {
      props: { shadowDom }
    } = this;

    return shadowDom ? (
      <ShadowDom>{this.innerContent()}</ShadowDom>
    ) : (
      this.innerContent()
    );
  }
}
