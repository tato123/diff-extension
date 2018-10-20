import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Button } from '@diff/shared-components';
import Row from '../../components/Row';
import actions from './redux/actions';

const UserInputRow = styled(Row)`
  &:hover {
    background: none;
    cursor: initial;
  }

  input[type='text'] {
    width: calc(100% + 32px);
    padding: 16px;
    border: none;
    margin-left: -16px;
    outline: none;
  }
`;

class AddCollaborator extends React.Component {
  static propTypes = {
    status: PropTypes.shape({
      submitting: PropTypes.bool,
      error: PropTypes.bool
    }).isRequired,

    inviteToWorkspace: PropTypes.func.isRequired,

    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired
  };

  submitForm = values => {
    const {
      props: { inviteToWorkspace, match }
    } = this;

    inviteToWorkspace(
      values.firstName,
      values.lastName,
      values.email,
      match.params.id
    );
  };

  onCancel = () => {};

  render() {
    const {
      submitForm,
      schema,
      initialValues,
      props: {
        status: { isSubmitting, isSubmitError }
      },
      onCancel
    } = this;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={submitForm}
        render={({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div>
              <UserInputRow hover={false}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
              </UserInputRow>
              <UserInputRow hover={false}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </UserInputRow>
              <UserInputRow hover={false}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </UserInputRow>
              <div>
                <Button type="button" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  primary
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    !values.email
                  }
                  loading={isSubmitting}
                >
                  Invite
                </Button>
              </div>
            </div>
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = () => ({
  status: {
    isSubmitting: false,
    isSubmitError: false
  }
});

const mapDispatchToProps = {
  inviteToWorkspace: actions.inviteToWorkspace
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCollaborator);