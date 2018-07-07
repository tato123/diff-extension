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
    history: PropTypes.object,
    match: PropTypes.shape({
      url: PropTypes.string
    }),
    createNewSelector: PropTypes.func
  };

  state = {
    highlightedSelector: null,
    selectionMode: true,
    createNewSelector: () => {}
  };

  callouts = {};

  diffWidgetClass = "x-diff-selectable";
  diffPortalAttr = "data-portal-id";

  removeHighlights = () => {
    document
      .querySelectorAll(`.${RANDOM_KEY}`)
      .forEach(elm => elm.classList.remove(RANDOM_KEY));
  };

  /**
   * Retrieve our stored selectors that are mapped to objects
   */
  selectorForEvent = evt => {
    for (let key in this.callouts) {
      const value = this.callouts[key];

      if (value === evt.target) {
        return key;
      }
    }
    return null;
  };

  /**
   * API for creating and registering a new selector
   */
  generateNewSelector = evt => {
    return this.props.createNewSelector(evt.target);
  };

  handleMouseOver = _.debounce(evt => {
    evt.preventDefault();

    if (this.state.selectionMode) {
      this.removeHighlights();
      if (
        !evt.target.hasAttribute(this.diffPortalAttr) &&
        !evt.target.classList.contains("x-diff-widget-resolved") &&
        !evt.target.classList.contains("x-diff-widget-resolving")
      ) {
        this.setState({
          highlightedSelector: null
        });

        evt.target.classList.add(RANDOM_KEY);
      } else {
        const selector = this.selectorForEvent(evt);
        if (selector != null) {
          this.setState({
            highlightedSelector: selector
          });
        }
      }
    }
  }, 15);

  // we allow elements to specify whether they can be selected or not
  // if they use this special data attribute we respect its state, otherwise
  // we just allow the selection
  isSelectable = evt => {
    return evt.target.hasAttribute("data-diff-selectable")
      ? evt.target.getAttribute("data-diff-selectable") === "true"
      : true;
  };

  handleClick = async evt => {
    // we dont' want to allow targetting diff
    // for non-test environments
    if (!this.isSelectable(evt)) {
      return;
    }

    evt.preventDefault();

    const selector =
      this.selectorForEvent(evt) || (await this.generateNewSelector(evt));
    const {
      match: { url }
    } = this.props;

    this.props.history.push(`${url}/${selector}/window`);

    // on selection of an element
    this.setState({
      selectionMode: false,
      highlightedSelector: null
    });

    return false;
  };

  componentDidMount() {
    document.body.addEventListener("mouseover", this.handleMouseOver, false);
    document.body.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener("mouseover", this.handleMouseOver, false);
    document.body.removeEventListener("click", this.handleMouseOver, false);
  }

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
      props: {
        selectors,
        match: { url }
      },
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
          />
        ))}
        <Route path={`${url}/:id/window`} component={Viewer} />
      </div>
    );
  }
}
