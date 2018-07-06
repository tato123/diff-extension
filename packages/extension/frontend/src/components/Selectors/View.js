// @flow

import React from "react";
import PropTypes from "prop-types";
import Callout from "./ElementHighlight";
import Viewer from "components/Viewer";
import { Route } from "react-router";
import { injectGlobal } from "styled-components";
import _ from "lodash";

const RANDOM_KEY = `df-x-highlight-${Math.floor(Math.random() * 1000)}`;

injectGlobal`
  .${RANDOM_KEY} {
    cursor: pointer;
    outline: 3px dashed #FF3C41;    
    transition: outline 0.075s;
    background-color: rgba(60, 65, 255, 0.2)!important;
  }
`;

export default class Selectors extends React.Component {
  static propTypes = {
    selectors: PropTypes.array.isRequired,
    history: PropTypes.object
  };

  state = {
    highlightedSelector: null,
    selectionMode: true
  };

  callouts = {};

  removeHighlights = () => {
    document
      .querySelectorAll(`.${RANDOM_KEY}`)
      .forEach(elm => elm.classList.remove(RANDOM_KEY));
  };

  /*eslint-disable */
  handleMouseOver = _.debounce(evt => {
    if (this.state.selectionMode) {
      this.removeHighlights();
      if (
        !evt.target.hasAttribute("data-portal-id") &&
        !evt.target.classList.contains("x-diff-widget-resolved")
      ) {
        this.setState({
          highlightedSelector: null
        });

        evt.target.classList.add(RANDOM_KEY);
      } else {
        for (let key in this.callouts) {
          const value = this.callouts[key];

          if (value === evt.target) {
            this.setState({
              highlightedSelector: key
            });
          }
        }
      }
    }
  }, 15);

  componentDidMount() {
    document.body.addEventListener("mouseover", this.handleMouseOver);
  }

  componentWillUnmount() {
    document.body.removeEventListener(this.handleMouseOver);
  }

  onSelectorClicked = (selector: string) => () => {
    this.setState({
      selectionMode: false,
      highlightedSelector: null
    });
    this.props.history.push(`/selectors/${selector}`);
  };

  assignTo = (selector, key) => callout => {
    this.callouts = {
      ...this.callouts,
      [selector]: {
        ...this.callouts[selector],
        [key]: callout
      }
    };
  };

  render() {
    const {
      props: { selectors },
      state: { highlightedSelector }
    } = this;

    return (
      <div>
        {selectors.map((selector, idx) => (
          <Callout
            highlight={highlightedSelector === selector}
            innerRef={callout => (this.callouts[selector] = callout)}
            key={idx}
            selector={selector}
            onClick={this.onSelectorClicked(selector)}
          />
        ))}
        <Route path="/selectors/:id" component={Viewer} />
      </div>
    );
  }
}
