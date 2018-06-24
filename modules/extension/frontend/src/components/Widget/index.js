import React from "react";
import PropTypes from "prop-types";
import ShadowDom from "./ShadowDOM";
import styled, { StyleSheetManager, ThemeProvider } from "styled-components";
import mainTheme from "components/Theme";

/* prettier-ignore */
const View = styled.div`


  font-family: ${({theme}) => theme.text.fontFamily};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  

  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.text.size.normal};
  line-height: ${({ theme }) => theme.text.lineHeight};

`;

export default class Widget extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shadowDom: PropTypes.bool
  };

  static defaultProps = {
    shadowDom: true
  };

  state = { div: null, hasError: false };

  ref = div => {
    this.setState({ div });
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });

    console.error("[Widget] error occured while displaying", error, info);
  }

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
              <ThemeProvider theme={mainTheme}>
                <View>{this.props.children}</View>
              </ThemeProvider>
            </StyleSheetManager>
          )}
        </div>
      </div>
    );
  };

  render() {
    const {
      props: { shadowDom },
      state: { hasError }
    } = this;

    if (hasError) {
      return <div>x</div>;
    }

    return shadowDom ? (
      <ShadowDom>{this.innerContent()}</ShadowDom>
    ) : (
      this.innerContent()
    );
  }
}
