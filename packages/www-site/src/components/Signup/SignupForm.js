import React from 'react'
import PropTypes from 'prop-types'
import ModalStep from './ModalStep'
import { Formik } from 'formik'
import { string, object } from 'yup'
import { Form, Button } from '@diff/shared-components'

import styled from 'styled-components'

const SignupButton = styled(Button)`
  padding: 15px 45px;
  border-radius: 100px;
  border: 0px;
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700 !important;
  cursor: pointer;
  text-decoration: none;
  height: unset;
`

export default class SignupForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    onSubmit: () => {},
    isSubmitting: false,
  }

  validationScheme = object().shape({
    email: string()
      .email()
      .required(),
    password: string()
      .min(6)
      .required(),
  })

  render() {
    const {
      validationScheme,
      props: { onSubmit },
    } = this

    return (
      <ModalStep header="Sign up for Diff">
        <Formik
          initialValues={{ email: '', password: '', displayName: '' }}
          validationSchema={validationScheme}
          onSubmit={onSubmit}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="app" onSubmit={handleSubmit}>
              <div className="form-group">
                <Form.Input
                  label="Email:"
                  type="email"
                  name="email"
                  required
                  error={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>

              <div className="form-group space-lg">
                <Form.Input
                  label="Password:"
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  error={touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>

              <div className="form-group">
                <Form.Input
                  label="Username:"
                  type="text"
                  name="displayName"
                  required
                  error={touched.displayName && errors.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.displayName}
                />
              </div>

              <SignupButton
                type="submit"
                primary
                loading={this.props.isSubmitting}
              >
                Submit
              </SignupButton>
            </form>
          )}
        />
      </ModalStep>
    )
  }
}
