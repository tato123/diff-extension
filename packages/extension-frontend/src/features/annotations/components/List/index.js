import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Label, Anchor } from '@diff/shared-components';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { actions, selectors } from '../../redux';
import Inspector from '../../../inspector';

import icon from './target.png';

const ListView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
`;

const TargetAnchor = styled(Anchor)`
  color: #4648b0;
  font-size: 12px;
  padding: 6px;

  &:hover {
    background: rgb(67, 202, 217, 0.1);
    cursor: pointer;
  }

  border-radius: 4px;

  img {
    width: 21px;
    height: 21px;
    vertical-align: middle;
    display: inline-flex;
    margin-right: 8px;
  }
`;

ListView.Row = styled.div`
  --df-border-bottom: rgba(112, 112, 112, 0.1);
  border-bottom: 1px solid var(--df-border-bottom);
  padding: 16px;

  &.annotation {
    color: #231c47;
    font-size: 14px;
  }

  &:hover {
    background: rgb(67, 202, 217, 0.1);
    cursor: pointer;
  }

  &.no-hover {
    background: transparent;
    cursor: none;
  }
`;

class List extends React.Component {
  static propTypes = {
    /**
     * All of the available annotations that we have
     */
    annotations: PropTypes.array,

    dispatch: PropTypes.func.isRequired,

    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    annotations: []
  };

  onLaunchInspect = enableInspector => () => {
    enableInspector();
  };

  onCancelInspect = () => {
    console.log('The user canceled the inspection');
  };

  onValue = context => {
    this.props.dispatch(actions.addAnnotation(context.element));
    console.log('received a new value of', context);
  };

  goTo = annotation => evt => {
    console.log('going to ', annotation);
    this.props.history.push(`/annotations/${encodeURIComponent(annotation)}`);
  };

  renderRow = annotation => (
    <ListView.Row
      className="annotation"
      key={encodeURIComponent(annotation)}
      onClick={this.goTo(annotation)}
    >
      {annotation}
    </ListView.Row>
  );

  render() {
    const {
      props: { annotations },
      onCancelInspect,
      onValue
    } = this;

    return (
      <div>
        <Inspector onCancel={onCancelInspect} onValue={onValue}>
          {(show, hide) => (
            <ListView.Row className="no-hover">
              <TargetAnchor onClick={show}>
                <img className="target" src={icon} alt="target element" />
                Target Element
              </TargetAnchor>
            </ListView.Row>
          )}
        </Inspector>

        {annotations.length === 0 && (
          <React.Fragment>
            <Header as="h1">Welcome</Header>
            <Label>
              Diff is the best tool ever. To get started, target an element on
              the page.
            </Label>
          </React.Fragment>
        )}
        {annotations.map(annotation => this.renderRow(annotation))}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  annotations: selectors.allAnnotationIdsSelector
});

export default withRouter(connect(mapStateToProps)(List));
