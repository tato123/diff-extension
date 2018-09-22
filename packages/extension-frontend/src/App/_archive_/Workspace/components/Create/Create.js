import React from "react";
import PropTypes from "prop-types";

// styled components
import { Button, Form, HR, Anchor, Label } from "@diff/shared-components";
import Icon from "react-icons-kit";
import { ic_close as iconClose } from "react-icons-kit/md/ic_close";
import TightHeader from "../TightHeader";
import { Footer, FormRegion, TitleRegion } from "../Layout";
import styled from "styled-components";
import MultiEmail from "../MultEmail";

// form handling
import { Formik } from "formik";
import { string, object } from "yup";

const ErrorLabel = styled(Label)`
  color: #c51162;
  margin: 4px 0px 0px 0px !important;
  font-size: 16px;
  padding-bottom: 0px;
  top: -8px;
  position: relative;
`;

export default class CreateWorkspace extends React.Component {
  static propTypes = {
    createWorkspace: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    isSubmitting: PropTypes.bool.isRequired,
    isSubmitError: PropTypes.bool.isRequired
  };

  static defaultProps = {
    onClose: () => {}
  };

  initialValues = {
    workspace: "",
    emails: []
  };

  schema = object().shape({
    workspace: string()
      .min(6)
      .required()
  });

  submitForm = values => {
    this.props.createWorkspace(values.workspace, values.emails);
  };

  render() {
    const {
      submitForm,
      schema,
      initialValues,
      props: { onClose, isSubmitting, isSubmitError }
    } = this;

    return (
      <div>
        <TitleRegion>
          <TightHeader as="h2" uppercase>
            New Workspace
          </TightHeader>
          <Anchor onClick={onClose}>
            <Icon icon={iconClose} />
          </Anchor>
        </TitleRegion>
        <HR />
        <ErrorLabel>
          {isSubmitError && "There was an error Creating the workspace"}
        </ErrorLabel>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submitForm}
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
              <FormRegion>
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
                <Form.Field label="Collaborators" error={errors.emails}>
                  <MultiEmail
                    name="emails"
                    emails={values.emails}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  />
                </Form.Field>
              </FormRegion>
              <Footer>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  type="submit"
                  primary
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  loading={isSubmitting}
                >
                  Create workspace
                </Button>
              </Footer>
            </Form>
          )}
        />
      </div>
    );
  }
}
