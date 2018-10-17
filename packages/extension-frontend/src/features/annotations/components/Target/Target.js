import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Anchor } from '@diff/shared-components';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import _ from 'lodash-es';
import { actions, selectors } from '../../redux';
import Inspector from '../../../inspector';
import Welcome from './Welcome';
import AnnotationList from './AnnotationList';
import ItemRow from '../../../../components/Row';

import icon from './target.png';

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

const TargetRow = styled(ItemRow)`
  padding: 16px 8px !important;
  z-index: 1;

  transition: box-shadow 125ms cubic-bezier(0, 0, 0.2, 1);

  ${props =>
    props.scrollY > 10 &&
    `
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .2), 0 1px 8px 0 rgba(0, 0, 0, .12)
  `};

  span:first-child {
    font-weight: 500;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1 auto;
  flex-direction: column;
`;

class List extends React.Component {
  static propTypes = {
    /**
     * Current annotations available to the user
     * for their current workspace
     */
    annotations: PropTypes.array,

    /**
     * Redux dispatcher
     */
    dispatch: PropTypes.func.isRequired,

    /**
     * React router / History object
     */
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    annotations: []
  };

  state = {
    scrollY: 0
  };

  componentWillUnmount() {
    if (this.tableRef) {
      this.tableRef.removeEventListener('scroll', this.scrollListener);
    }
  }

  onLaunchInspect = enableInspector => () => {
    enableInspector();
  };

  scrollListener = evt => {
    const val = evt.target.scrollTop > 10 ? 21 : 0;
    const {
      state: { scrollY }
    } = this;
    if (val !== scrollY) {
      this.setState({ scrollY: val });
    }
  };

  onValue = context => {
    const {
      props: { dispatch }
    } = this;
    dispatch(actions.addAnnotation(context.element));
  };

  goTo = annotation => () => {
    const {
      props: { history }
    } = this;
    history.push(`/annotations/${encodeURIComponent(annotation)}`);
  };

  setTableRef = element => {
    if (element) {
      element.addEventListener('scroll', this.scrollListener);
      this.tableRef = element;
    }
  };

  render() {
    const {
      props: { annotations },
      state: { scrollY },
      onCancelInspect,
      onValue,
      goTo,
      setTableRef
    } = this;

    return (
      <Container>
        <Inspector onCancel={onCancelInspect} onValue={onValue}>
          {show => (
            <TargetRow className="no-hover" scrollY={scrollY}>
              <TargetAnchor onClick={show}>
                <img className="target" src={icon} alt="target element" />
                Target Element
              </TargetAnchor>
            </TargetRow>
          )}
        </Inspector>
        {annotations.length === 0 && <Welcome />}
        {annotations.length > 0 && (
          <AnnotationList
            annotations={annotations}
            onClick={goTo}
            innerRef={setTableRef}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  annotations: selectors.allAnnotationIdsSelector
});

export default withRouter(connect(mapStateToProps)(List));
