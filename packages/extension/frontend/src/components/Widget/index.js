import React from "react";
import PropTypes from "prop-types";
import ShadowDom from "./ShadowDOM";
import styled, {
  StyleSheetManager,
  ThemeProvider,
  injectGlobal
} from "styled-components";
import mainTheme from "components/Theme";
import { normalize } from "polished";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:100,200,300,400,500,600,700,800,900');

`;

/* prettier-ignore */
const View = styled.div`
  ${normalize(false)}

  font-family: 'Barlow Semi Condensed', sans-serif;


  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.text.size.normal};
  line-height: ${({ theme }) => theme.text.lineHeight};

  box-sizing: border-box;

  *, *:before, *:after {
    box-sizing: inherit;
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
