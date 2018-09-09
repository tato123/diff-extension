import React from "react";
import PropTypes from "prop-types";
import {
  HR,
  Button,
  Form,
  Image,
  Placeholder,
  Label,
  Anchor
} from "@diff/shared-components";
import UsersTable, { UserRow } from "../UsersTable";
import Status from "../Status";
import TightHeader from "../TightHeader";
import { TitleRegion } from "../Layout";
import Icon from "react-icons-kit";
import { ic_close as iconClose } from "react-icons-kit/md/ic_close";
import styled from "styled-components";

import { Formik } from "formik";
import MultiEmail from "../MultEmail";

const InviteUserRegion = styled.div`
  display: flex;
  justify-content: flex-end;
  button:first-child {
    margin-right: 16px;
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

    workspaceId: PropTypes.string,

    invitedUsers: PropTypes.array,

    onClose: PropTypes.func
  };

  static defaultProps = {
    onClose: () => {}
  };

  state = {
    addUser: false
  };

  initialValues = {
    emails: []
  };

  onSubmitCollaborator = values => {
    values.emails.forEach(email => {
      this.props.addCollaborator(email, this.props.workspaceId);
    });

    //
    this.setState({ addUser: false });
  };

  renderForm = () => {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.onSubmitCollaborator}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Field label="Collaborators" error={errors.emails}>
              <MultiEmail
                name="emails"
                emails={values.emails}
                onChange={setFieldValue}
                onBlur={handleBlur}
              />
            </Form.Field>
            <InviteUserRegion>
              <Button
                onClick={() => this.setState({ addUser: false })}
                type="button"
              >
                Cancel
              </Button>
              <Button primary={true} type="submit">
                Invite User
              </Button>
            </InviteUserRegion>
          </Form>
        )}
      />
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
          <Status pending={user.invite} />
        </div>
      </UserRow>
    );
  };

  render() {
    const {
      props: { workspaceUsers, invitedUsers, onClose },
      state: { addUser }
    } = this;

    return (
      <React.Fragment>
        <TitleRegion>
          <TightHeader as="h2" uppercase>
            {this.props.workspaceName}
          </TightHeader>
          <Anchor onClick={onClose}>
            <Icon icon={iconClose} />
          </Anchor>
        </TitleRegion>
        <HR />

        <UsersTable>
          <div
            className="listing"
            style={{ height: addUser ? "95px" : "256px" }}
          >
            {workspaceUsers.map(user => user && this.renderUser(user))}
            {invitedUsers.map(
              email => email && this.renderUser({ email, invite: true })
            )}
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
