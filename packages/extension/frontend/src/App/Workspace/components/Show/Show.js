import React from "react";
import PropTypes from "prop-types";
import {
  HR,
  Button,
  Form,
  Image,
  Placeholder,
  Label
} from "@diff/shared-components";
import UsersTable, { UserRow } from "../UsersTable";
import Status from "../Status";
import TightHeader from "../TightHeader";

import { Formik } from "formik";
import { string, object } from "yup";

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
        <div className="displaynameCell">
          <Label as="body1">{user.displayName || user.email}</Label>
        </div>
        <div>
          <Status />
        </div>
      </UserRow>
    );
  };

  render() {
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
  }
}
