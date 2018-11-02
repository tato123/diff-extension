import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_add_circle_outline as AddCircleIcon } from 'react-icons-kit/md/ic_add_circle_outline';
import { Space } from '@diff/shared-components';
import Row from '../../components/Row';
import Workspaces from './Workspaces';

const Content = ({ history }) => (
  <div>
    <Row
      onClick={() => history.push('/workspace/create')}
      style={{ color: '#4648B0' }}
    >
      <span> Create a new project</span>
    </Row>
    <Workspaces>
      {workspaces => (
        <React.Fragment>
          {workspaces.map(workspace => (
            <Row
              key={workspace.id}
              onClick={() => history.push(`/workspace/${workspace.id}`)}
            >
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
