import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// styled components
import { Button, Form, Label, Space } from '@diff/shared-components';

// form handling
import { Formik } from 'formik';
import { string, object } from 'yup';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import MultiEmail from '../../components/MultiEmail';

import Row from '../../components/Row';
import { selectors, actions } from './redux';

const ErrorLabel = styled(Label)`
  color: #c51162;
  margin: 4px 0px 0px 0px !important;
  font-size: 16px;
  padding-bottom: 0px;
  top: -8px;
  position: relative;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: var(--df-space-2);
  padding: 8px 0px;
`;

const OverrideRow = styled(Row)`
  padding: 4px 16px;
`;

const Container = styled.div`
  overflow: auto;
`;

const maxHeight = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
};

class CreateWorkspace extends React.Component {
  static propTypes = {
    status: PropTypes.shape({
      submitting: PropTypes.bool,
      error: PropTypes.bool
    }).isRequired,
    createWorkspace: PropTypes.func.isRequired
  };

  initialValues = {
    workspace: '',
    emails: []
  };

  schema = object().shape({
    workspace: string()
      .min(6)
      .required()
  });

  submitForm = values => {
    const {
      props: { createWorkspace }
    } = this;

    createWorkspace(values.workspace, values.emails);
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
      <Container style={{ ...maxHeight }}>
        <ErrorLabel>
          {isSubmitError && 'There was an error Creating the workspace'}
        </ErrorLabel>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submitForm}
          render={({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          }) => (
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{ ...maxHeight }}
            >
              <div style={{ ...maxHeight }}>
                <div style={{ ...maxHeight }}>
                  <OverrideRow className="no-hover">
                    <Form.Input
                      label="Workspace Name"
                      name="workspace"
                      type="text"
                      placeholder="The drop zone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.workspace}
                      value={values.workspace}
                    />
                  </OverrideRow>
                  <OverrideRow className="no-hover">
                    <Form.Field label="Collaborators" error={errors.emails}>
                      <MultiEmail
                        name="emails"
                        emails={values.emails}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                      />
                    </Form.Field>
                  </OverrideRow>
                </div>
                <Footer>
                  <Button.Flat onClick={onCancel}>Cancel</Button.Flat>
                  <Button.Flat
                    type="submit"
                    primary
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    loading={isSubmitting}
                  >
                    Create workspace
                  </Button.Flat>
                </Footer>
              </div>
            </Form>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  status: createStructuredSelector({
    submitting: selectors.isCreateWorkspaceSubmittingSelector,
    error: selectors.isCreateWorkspaceSubmitErrorSelector
  })
});

const mapDispatchToProps = {
  createWorkspace: actions.createWorkspace
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateWorkspace)
);
