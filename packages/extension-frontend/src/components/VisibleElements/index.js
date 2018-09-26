import React from 'react';
import PropTypes from 'prop-types';
import { fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export default class VisibleElement extends React.Component {
  static propTypes = {
    selectors: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.func.isRequired
  };

  state = {
    visibility: []
  };

  componentDidMount() {
    const scroll = fromEvent(window, 'scroll');
    const resize = fromEvent(window, 'resize');

    const listener$ = merge(scroll, resize).pipe(debounceTime(1));

    this.windowListener = listener$.subscribe(
      this.onWindowChange,
      this.onFinish,
      this.onFinish
    );

    this.checkVisibility();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.selectors.length !== this.props.selectors.length) {
      this.checkVisibility();
    }
    return null;
  }

  onWindowChange = evt => {
    // allow us to do any additional processing here
    // otherwise defer out to our update check
    this.checkVisibility();
  };

  checkVisibility = () => {
    const {
      props: { selectors }
    } = this;

    const visibilityOfElements = selectors.map(selector => {
      const element = document.querySelector(selector);
      if (!element) {
        return {
          selector,
          visible: false
        };
      }

      const bounding = element.getBoundingClientRect();
      return {
        selector,
        visible: this.isVisible(bounding)
      };
    });

    this.setState({
      visibility: visibilityOfElements
    });
  };

  onFinish = () => {
    if (this.windowListener && this.windowListener.unsubscribe) {
      this.windowListener.unsubscribe();
    }
  };

  componentWillUnmount() {
    this.onFinish();
  }

  isVisible = bounding =>
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight);

  render() {
    const {
      state: { visibility }
    } = this;

    return this.props.children(visibility);
  }
}
