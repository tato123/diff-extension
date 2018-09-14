import React from "react";
import PropTypes from "prop-types";
import ShadowDom from "./styles/ShadowDOM";
import styled, { StyleSheetManager, ThemeProvider } from "styled-components";
import mainTheme, { get } from "../../theme";

import blueprintCss from "./core/blueprint";
import blueprintIconsCss from "./core/icons";
import normalize from "./core/normalize";

// import our local fonts
import "./styles/BarlowFont";
import "./styles/RobotoFont";

/* prettier-ignore */
const View = styled.div`
  font-family: ${get('text.fontFamily')};
  color: ${get('colors.textColor')};
  font-size: 1rem;
  box-sizing: border-box;

  *, *:before, *:after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    text-rendering: geometricPrecision;

  }
`;

const styleContent = `
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
      -webkit-border-radius: 10px;
      border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    opacity:0.1;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(255,255,255,0.5); 
    -webkit-box-shadow: inset 0 0 6px rgba(255,255,255,0.5); 
  }

  ${normalize}
  ${blueprintCss}
  ${blueprintIconsCss}
`;

export default class StyleBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shadowDom: PropTypes.bool,
    innerRef: PropTypes.func,
    selectable: PropTypes.bool
  };

  static defaultProps = {
    shadowDom: true,
    selectable: false,
    innerRef: () => {}
  };

  state = { div: null, hasError: false };

  ref = div => {
    if (!div) {
      return;
    }

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
      state: { div }
    } = this;

    return (
      <div>
        <style>{styleContent}</style>
        <div ref={ref} id="jss-insertion-point">
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
      props: { shadowDom, selectable },
      state: { hasError }
    } = this;

    if (hasError) {
      return <div>x</div>;
    }

    return shadowDom ? (
      <ShadowDom innerRef={this.props.innerRef} selectable={selectable}>
        {this.innerContent()}
      </ShadowDom>
    ) : (
      this.innerContent()
    );
  }
}
