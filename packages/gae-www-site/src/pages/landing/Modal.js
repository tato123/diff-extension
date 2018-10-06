import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import styled from 'styled-components';
import { Header, Form } from '@diff/shared-components';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { Button } from '../../components/site-components';
import mark from '../../components/images/mark.png';

const Container = styled.div`
  h3 {
    font-size: 32px;
    color: #130c3b;
  }
  @media (max-width: 575.98px) {
    h3 {
      font-size: 20px;
      margin-bottom: 16px;
    }
  }
`;

const Logo = styled.img`
  margin-bottom: 32px;
  @media (max-width: 575.98px) {
    margin-bottom: 16px;
  }
  max-height: 32px;
  height: 32px;
  min-height: 32px;
`;

const Spacing = styled.span`
  @media (max-width: 575.98px) {
    margin-bottom: 32px;
  }

  margin-bottom: 64px;
`;

export default class ModalForm extends React.PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    onCloseModal: PropTypes.func,
    onComplete: PropTypes.func
  };

  static defaultProps = {
    open: false,
    onCloseModal: () => {},
    onComplete: () => {}
  };

  initialValues = {
    lastname: '',
    firstname: '',
    email: ''
  };

  schema = object().shape({
    email: string()
      .email()
      .required()
  });

  submitForm = (values, { setSubmitting, setErrors }) => {
    const {
      props: { onComplete }
    } = this;

    setSubmitting(true);
    fetch(`${process.env.API_SERVER}/user/email/signup?list=earlyAccess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        email: 'jfontanez@getdiff.app',
        firstname: 'Jonathan',
        lastname: 'Fontanez'
      })
    })
      .then(async response => {
        if (response.ok) {
          onComplete();
        }
        throw new Error(await response.text());
      })

      .catch(error => {
        setErrors({ global: error.message });
        console.error(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  render() {
    const {
      props: { open, onCloseModal },
      initialValues,
      schema,
      submitForm
    } = this;
    return (
      <Modal open={open} onClose={onCloseModal} center>
        <Container className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-5 col-lg-5">
              <Logo
                src={mark}
                className="d-inline-block align-top img-fluid"
                alt="diff logo"
              />
              <Header as="h3">Get early access to Diff</Header>
            </div>
            <div className="col-12 col-md-7 col-lg-7">
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
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    {errors.global}
                    <Spacing>
                      <Form.Input
                        type="text"
                        name="firstname"
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.firstname}
                        value={values.firstname}
                      />
                      <Form.Input
                        type="text"
                        name="lastname"
                        label="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lastname}
                        value={values.lastname}
                      />
                      <Form.Input
                        type="email"
                        name="email"
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                        value={values.email}
                      />
                    </Spacing>
                    <Button
                      type="submit"
                      primary
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
                      Yes, I want early access
                    </Button>
                  </Form>
                )}
              />
            </div>
          </div>
        </Container>
      </Modal>
    );
  }
}
