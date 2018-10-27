import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_add_circle_outline as AddCircleIcon } from 'react-icons-kit/md/ic_add_circle_outline';
import styled from 'styled-components';
import { Space } from '@diff/shared-components';
import * as R from 'react-router';
import * as H from 'history';
import ReduxConnect from '../../components/ReduxConnect';
import Row from '../../components/Row';
import { selectors } from './redux';

const UserRow = styled(Row)`
  .name {
    font-weight: bold;
  }

  .email {
    font-weight: 300;
    font-size: var(df-font-xs);
  }
`;

const Pending = styled.small`
  color: var(--df-text-color-highlight);
`;
interface CustomMatch extends R.match {
  params: {
    id: string;
  };
}
interface ListCollaboratorsProp {
  match: CustomMatch;
  history: H.History;
}

const ListCollaborators: React.SFC<ListCollaboratorsProp> = ({
  match,
  history
}) => (
  <ReduxConnect
    selectors={{
      collaborators: selectors.allCollaboratorsSelectors,
      invites: selectors.allInviteSelectors
    }}
    id={match.params.id}
  >
    {({ collaborators, invites }) => (
      <div>
        <Row
          onClick={() =>
            history.push(`/workspace/${match.params.id}/addCollaborator`)
          }
        >
          <Icon icon={AddCircleIcon} />
          Add a collaborator
        </Row>
        {collaborators.map(user => (
          <UserRow key={user.sub}>
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </UserRow>
        ))}
        {invites.length > 0 && (
          <Space top={2} left={3}>
            <Pending>Pending</Pending>
          </Space>
        )}

        {invites.map(user => (
          <UserRow key={user.email} highlight={false}>
            <div>{user.email}</div>
          </UserRow>
        ))}
      </div>
    )}
  </ReduxConnect>
);

export default ListCollaborators;
