import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Workspaces from './Workspaces';
import Row from '../../components/Row';

const Content = ({ history }) => (
  <div>
    <Row onClick={() => history.push('/workspace/find')}>Find a workspace</Row>
    <Row onClick={() => history.push('/workspace/create')}>Add a workspace</Row>
    <Workspaces>
      {workspaces => (
        <React.Fragment>
          {workspaces.map(workspace => (
            <Row onClick={() => history.push(`/workspace/${workspace.id}`)}>
              {workspace.name}
            </Row>
          ))}
        </React.Fragment>
      )}
    </Workspaces>
  </div>
);

Content.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(Content);
