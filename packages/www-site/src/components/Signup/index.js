import React from 'react'
import { Header, Form, Button } from '@diff/shared-components'

import { Formik } from 'formik'
import { string, object } from 'yup'
import './signup.css'

const ModalStep = ({ header, children }) => (
  <div className="form">
    <Header as="h3">{header}</Header>
    {children}
  </div>
)

const signup = async (email, password, displayName) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      displayName,
    }),
  }

  const response = await fetch(`${process.env.API_SERVER}/signup`, {
    ...options,
    method: 'POST',
  })

  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.json()
}

const isUser = async email => {
  const response = await fetch(
    `${process.env.API_SERVER}/validate?email=${email}`
  )

  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.text()
}

export default class Signup extends React.Component {
  state = {
    step: 0,
    isSubmitting: false,
  }

  gotoStep = step => {
    this.setState({ step })
  }

  handleSignup = values => {
    console.log('going to signup with ', values)
    this.setState({ isSubmitting: true })

    setTimeout(() => {
      this.setState({ step: 1 })
    }, 2000)
  }

  validationScheme = object().shape({
    email: string()
      .email()
      .required(),
    password: string()
      .min(6)
      .required(),
  })

  renderSignup = () => (
    <ModalStep header="Sign up for Diff">
      <Formik
        initialValues={{ email: '', password: '', displayName: '' }}
        validationSchema={this.validationScheme}
        onSubmit={this.handleSignup}
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

            <Button primary loading={this.state.isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      />
    </ModalStep>
  )

  renderInstall = () => (
    <ModalStep header="Install Extension">
      <a href="#" onClick={() => this.gotoStep(2)}>
        Install from the chrome store
      </a>
    </ModalStep>
  )

  renderMakeComment = () => (
    <ModalStep header="Add your first comment">
      <p>Make a comment</p>
      <a href="#" onClick={() => this.gotoStep(3)} />
    </ModalStep>
  )

  renderMakeWorkspace = () => (
    <ModalStep header="Install Extension">
      <p>Make a workspace</p>
    </ModalStep>
  )

  render() {
    const {
      state: { step },
    } = this

    // if (isLoggedIn()) {
    //   redirectTo(`/app/profile`)
    // }

    return (
      <div className="stage">
        <div className="background">
          <main>
            <header>
              <div className="skeleton" />
            </header>
            <section>
              <div className="section">
                <div className="h1 skeleton round" />
                <div className="p skeleton round" />
                <div className="p skeleton round" />
                <div className="p skeleton round" />
                <div className="p skeleton round" />
                <div className="button skeleton round" />
              </div>
              <div className="section">
                <div className="avatar skeleton round" />
                <div className="box skeleton round" />
              </div>
            </section>
            <footer>
              <div className="skeleton" />
            </footer>
          </main>
        </div>
        <div className="fg">
          <div className="steps">
            <ul className="list-unstyled">
              <li className={`${step === 0 && 'active'}`}>Sign up</li>
              <li className={`${step === 1 && 'active'}`}>Install</li>
              <li className={`${step === 2 && 'active'}`}>Make a comment</li>
              <li className={`${step === 3 && 'active'}`}>
                Create a workspace
              </li>
            </ul>
          </div>
          {step === 0 && this.renderSignup()}
          {step === 1 && this.renderInstall()}
          {step === 2 && this.renderMakeComment()}
          {step === 3 && this.renderMakeWorkspace()}
        </div>
      </div>
    )
  }
}
