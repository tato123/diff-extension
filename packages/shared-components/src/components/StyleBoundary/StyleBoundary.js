import React from "react";
import PropTypes from "prop-types";
import ShadowDom from "./styles/ShadowDOM";
import styled, {
  StyleSheetManager,
  ThemeProvider,
  injectGlobal
} from "styled-components";
import mainTheme, { get } from "../../theme";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:100,200,300,400,500,600,700,800,900');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

`;

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

export default class Widget extends React.PureComponent {
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
