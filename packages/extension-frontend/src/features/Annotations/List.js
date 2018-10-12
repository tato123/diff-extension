import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Label, Anchor } from '@diff/shared-components';
import { createStructuredSelector } from 'reselect';
import selectors from './selectors';
import Inspector from '../inspector';

class List extends React.PureComponent {
  static propTypes = {
    annotations: PropTypes.array
  };

  static defaultProps = {
    annotations: []
  };

  onLaunchInspect = enableInspector => () => {
    enableInspector();
  };

  onCancelInspect = () => {};

  onValue = () => {};

  render() {
    const {
      props: { annotations },
      onLaunchInspect,
      onCancelInspect,
      onValue
    } = this;

    return (
      <div>
        <Inspector onCancel={onCancelInspect} onValue={onValue} />
        <Inspector.Toggle>
          {enableInspector => (
            <Anchor onClick={onLaunchInspect(enableInspector)}>
              Target Element
            </Anchor>
          )}
        </Inspector.Toggle>
        {annotations.length === 0 && (
          <React.Fragment>
            <Header as="h1">Welcome</Header>
            <Label>
              Diff is the best tool ever. To get started, target an element on
              the page.
            </Label>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  annotations: selectors.allAnnotationValuesSelector
});

export default connect(mapStateToProps)(List);
