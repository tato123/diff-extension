import React from 'react';
import PropTypes from 'prop-types';
import styled, { StyleSheetManager } from 'styled-components';
import ShadowDom from './styles/ShadowDOM';

import blueprintCss from './core/blueprint';
import blueprintIconsCss from './core/icons';
import normalize from './core/normalize';

/* prettier-ignore */
const View = styled.div`

  @import url('https://fonts.googleapis.com/css?family=Heebo:100,300,400,500,700,800,900');
  
  --df-font-family: 'Heebo', sans-serif;
  --df-text-color-primary: #fff;
  --df-font-size: 16px;
  
  --color-purple: #4648b0;
  --color-purple-1: #6848b0;
  --color-blue-1: #1f1d3f;
  --color-blue-2: #241c49;

  --gradient-purple: linear-gradient(to bottom right, var(--color-purple), var(--color-purple-1) );
  --gradient-header: linear-gradient(to right, var(--color-blue-1), var(--color-blue-2) );
  

  font-family: var(--df-font-family);
  color: var(--color-blue-1);
  font-size: var(--df-font-size);
  box-sizing: border-box;
  line-height: 1.5;

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
    console.error('[Widget] error occured while displaying', error, info);
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
              <View>{this.props.children}</View>
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
