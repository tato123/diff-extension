import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  StyleBoundary,
  Header,
  HR,
  Button,
  Form
} from "@diff/shared-components";
import { Transition } from "react-spring";

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

  > button {
    margin-top: 16px;
  }
`;

const UserRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  > div:first-child {
    width: 64px;
    font-weight: 700;
  }

  > div:last-child {
  }
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

    workspaceId: PropTypes.string
  };

  state = {
    addUser: false
  };

  onSubmitCollaborator = evt => {
    evt.preventDefault();
    /* eslint-disable */
    debugger;
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
          label="Email"
          name="email"
          type="text"
          placeholder="email@domain.com"
        />
        <Button onClick={() => this.setState({ addUser: false })} type="button">
          Cancel
        </Button>
        <Button type="submit">Add User</Button>
      </Form>
    );
  };

  renderUser = user => {
    return (
      <UserRow key={user.email}>
        <div>ME</div>
        <div>{user.email}</div>
      </UserRow>
    );
  };

  renderWorkspace = () => {
    const {
      props: { workspaceUsers },
      state: { addUser }
    } = this;
    return (
      <React.Fragment>
        <Header as="h1">COLLABORATORS</Header>
        <HR />
        <UsersTable>
          {workspaceUsers.map(user => this.renderUser(user))}
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
        <Header as="h2">Start with a workspace</Header>
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
