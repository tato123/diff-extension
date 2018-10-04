import React from 'react';
import PropTypes from 'prop-types';
import { StyleBoundary } from '@diff/shared-components';
import _ from 'lodash-es';

export default class Widget extends React.PureComponent {
  static propTypes = {
    /**
     * Allow widgets to either be a render function
     * or a raw set of children
     */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

    open: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  };

  static defaultProps = {
    open: true
  };

  render() {
    const {
      props: { open, children }
    } = this;

    const childProps = _.omit(this.props, ['children']);
    const openVal = _.isFunction(open) ? open(childProps) : open;
    if (openVal) {
      return (
        <StyleBoundary>
          {_.isFunction(children) ? children(childProps) : children}
        </StyleBoundary>
      );
    }

    return null;
  }
}
