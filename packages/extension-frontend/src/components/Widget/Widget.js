import React from 'react';
import PropTypes from 'prop-types';
import { StyleBoundary } from '@diff/shared-components';
import _ from 'lodash-es';

export default class Widget extends React.Component {
  static propTypes = {
    /**
     * Allow widgets to either be a render function
     * or a raw set of children
     */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

    /**
     * Based on the name, is this element shown
     */
    shown: PropTypes.bool,
    token: PropTypes.string,

    name: PropTypes.string,
    context: PropTypes.object,
    show: PropTypes.func.isRequired,
    closeAll: PropTypes.func.isRequired,
    shouldRender: PropTypes.func
  };

  static defaultProps = {
    shown: false,
    token: null,
    name: null,
    shouldRender: () => true
  };

  render() {
    const {
      props: { shouldRender }
    } = this;

    const childProps = _.omit(this.props, ['children']);
    if (shouldRender(childProps)) {
      return (
        <StyleBoundary>
          {_.isFunction(this.props.children)
            ? this.props.children(childProps)
            : this.props.children}
        </StyleBoundary>
      );
    }

    return null;
  }
}
