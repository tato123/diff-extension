import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  StyleBoundary,
  Header,
  HR,
  Button,
  Form,
  Image,
  Placeholder
} from "@diff/shared-components";

const Modal = styled.div`
  position: fixed;
  right: 60px;
  bottom: 136px;
  z-index: 999999999;
`;

Modal.Content = styled.div`
  z-index: 999999999;
  position: relative;
  background-color: #191b3b;
  padding: 16px;
  border: 1px solid #888;
  width: 350px;
  color: #fff;
  border-radius: 8px;
  min-height: 400px;
  box-shadow: 6px 6px 0px 3px rgba(0, 0, 0, 0.3);
`;

const UsersTable = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .listing {
    display: flex;
    flex-direction: column;
    > div.userRow {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px 0;

      > div:last-child {
        display: flex;
        align-items: center;
      }
    }
    > div.userRow:first-child {
      padding-top: 0;
    }

    > div.userRow:last-child {
      border-bottom: none;
    }

    .displaynameCell {
      align-self: center;
    }
  }

  > button {
    margin-top: 16px;
  }
`;

const Status = styled.div`
  width: 16px;
  height: 16px;
  background: #5ebf4b;
  border-radius: 50%;
  align-items: center;
`;

const UserRow = styled.div`
  display: grid;
  grid-template-areas: ". . .";
  grid-template-columns: 48px 1fr 48px;
  grid-template-rows: 1fr;
`;

const TightHeader = styled(Header)`
  font-weight: 500 !important;
  margin: 0;
`;

export default class Workspace extends React.Component {
  static propTypes = {
    /**
     * Add a new collaborator to our
     * workspace
     */
    addCollaborator: PropTypes.func.isRequired,

    /**
     *
     */
    createWorkspace: PropTypes.func.isRequired,

    workspaceName: PropTypes.string,

    workspaceUsers: PropTypes.array,

    workspaceId: PropTypes.string,

    invitedUsers: PropTypes.array
  };

  state = {
    addUser: false
  };

  onSubmitCollaborator = evt => {
    evt.preventDefault();
    this.props.addCollaborator(evt.target.email.value, this.props.workspaceId);
    this.setState({ addUser: false });
    return false;
  };

  onCreateWorkspace = evt => {
    evt.preventDefault();
    this.props.createWorkspace(evt.target.workspace.value);
    return false;
  };

  renderForm = () => {
    return (
      <Form onSubmit={this.onSubmitCollaborator} autoComplete="off">
        <Form.Input
          label=""
          name="email"
          type="text"
          placeholder="email@domain.com"
        />
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => this.setState({ addUser: false })}
            type="button"
          >
            Cancel
          </Button>
          <Button primary={true} type="submit">
            Add User
          </Button>
        </div>
      </Form>
    );
  };

  renderUser = user => {
    return (
      <UserRow key={user.email} className="userRow">
        <div>
          {user.photoUrl && <Image small src={user.photoUrl} avatar />}
          {!user.photoUrl && (
            <Placeholder value={user.displayName || user.email} />
          )}
        </div>
        <div className="displaynameCell">{user.displayName || user.email}</div>
        <div>
          <Status />
        </div>
      </UserRow>
    );
  };

  renderWorkspace = () => {
    const {
      props: { workspaceUsers, invitedUsers },
      state: { addUser }
    } = this;
    return (
      <React.Fragment>
        <TightHeader as="h2">{this.props.workspaceName}</TightHeader>
        <HR />
        <UsersTable>
          <div className="listing">
            {workspaceUsers.map(user => user && this.renderUser(user))}
            {invitedUsers.map(user => user && this.renderUser(user))}
          </div>
          {addUser && this.renderForm()}
          {!addUser && (
            <Button onClick={() => this.setState({ addUser: true })}>
              + Add collaborator
            </Button>
          )}
        </UsersTable>
      </React.Fragment>
    );
  };

  renderCreateJoinWorkspace = () => {
    return (
      <React.Fragment>
        <TightHeader as="h2">Start with a workspace</TightHeader>
        <p>In Diff, teams are called workspaces</p>
        <Form onSubmit={this.onCreateWorkspace} autoComplete="off">
          <Form.Input
            label="Workspace Name"
            name="workspace"
            type="text"
            placeholder="Squirlley rocket"
          />

          <Button type="submit">Create workspace</Button>
        </Form>
      </React.Fragment>
    );
  };

  render() {
    const {
      props: { workspaceName }
    } = this;
    return (
      <Modal>
        <StyleBoundary>
          <Modal.Content>
            {!workspaceName && this.renderCreateJoinWorkspace()}
            {workspaceName && this.renderWorkspace()}
          </Modal.Content>
        </StyleBoundary>
      </Modal>
    );
  }
}
