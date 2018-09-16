import React from 'react'
import { Header, Form, Button } from '@diff/shared-components'

import { Formik } from 'formik'
import { string, object } from 'yup'
import './signup.css'
import styled from 'styled-components'
import { initializeFirestore } from '../../utils/firestore'

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

const login = async (accessToken, db) => {
  await db.app.auth().setPersistence('session')

  const results = db.app.auth().signInWithCustomToken(accessToken)
  return results
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
    step: null,
    isSubmitting: false,
    db: null,
  }

  gotoStep = step => {
    this.setState({ step })
  }

  handleSignup = values => {
    this.setState({ isSubmitting: true })
    signup(values.email, values.password, values.displayName)
      .then(response => login(response.access_token, this.state.db))
      .then(token => {
        this.setState({ step: 1 })
      })
      .catch(error => {
        console.error(error)
      })
  }

  async componentDidMount() {
    return new Promise(async (resolve, reject) => {
      const db = await initializeFirestore()
      db.app.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log('current user', user)
          this.setState({ step: 1, db })
        } else {
          // No user is signed in.
          console.log('no user')
          this.setState({ step: 0, db })
        }
      })

      this.setState({ db })
    })
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

            <SignupButton
              type="submit"
              primary
              loading={this.state.isSubmitting}
            >
              Submit
            </SignupButton>
          </form>
        )}
      />
    </ModalStep>
  )

  install = () => {
    chrome.webstore.install(
      'https://chrome.google.com/webstore/detail/emabkoeopfpoeighgafbhlldiemjdlbk',
      () => {
        console.log('installed successfully')
        this.setState({ step: 2 })
      },
      (error, errorCode) => {
        this.setState({ step: 2 })
      }
    )
  }

  renderInstall = () => (
    <ModalStep header="Install Diff">
      <p>
        Next, add the extension to your browser. Click the button to install
        Diff.
      </p>
      <Button primary onClick={this.install}>
        Install
      </Button>
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

  renderWaiting = () => <ModalStep header="..." />

  render() {
    const {
      state: { step, db },
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
          {db == null && this.renderWaiting()}
          {step === 0 && db != null && this.renderSignup()}
          {step === 1 && db != null && this.renderInstall()}
          {step === 2 && db != null && this.renderMakeComment()}
          {step === 3 && db != null && this.renderMakeWorkspace()}
        </div>
      </div>
    )
  }
}
