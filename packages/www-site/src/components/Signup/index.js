import React from 'react'
import PropTypes from 'prop-types'

import { Header, Form, Button, Anchor } from '@diff/shared-components'
import ExtensionBridge from '../ExtensionBridge'
import { Formik } from 'formik'
import { string, object } from 'yup'
import './signup.css'
import styled from 'styled-components'
import { initializeFirestore } from '../../utils/firestore'

import { Icon } from 'react-icons-kit'
import { ic_check_circle as checkCircle } from 'react-icons-kit/md/ic_check_circle'
import Template from './Template'
import { signup, login } from './auth'

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

const SignupAnchor = styled(Anchor)`
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
  background-color: #43cad9;
  color: #fff;

  &:hover {
    text-decoration: none;
  }
`

const ModalStep = ({ header, children }) => (
  <div>
    <div className="form">
      <Header as="h3">{header}</Header>
      {children}
    </div>
  </div>
)

export default class Signup extends React.Component {
  state = {
    step: null,
    isSubmitting: false,
    db: null,
    installed: false,
  }

  gotoStep = step => {
    this.setState({ step })
  }

  handleSignup = values => {
    this.setState({ isSubmitting: true })
    signup(values.email, values.password, values.displayName)
      .then(response =>
        login(response.access_token, response.refresh_token, this.state.db)
      )
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

  renderInstall = () => {
    if (this.state.installed) {
      // executing setState can't occur in the same step
      // where react is expecting rendered content, this is effectively
      // an async component

      setTimeout(() => {
        this.setState({ step: 2 })
      })
      return null
    }
    return (
      <ModalStep header="Install Diff">
        <p>
          Next, add the extension to your browser. Click the button to install
          Diff.
        </p>
        <SignupAnchor
          target="_blank"
          href="https://chrome.google.com/webstore/detail/diff/emabkoeopfpoeighgafbhlldiemjdlbk"
        >
          Install
        </SignupAnchor>
      </ModalStep>
    )
  }

  renderMakeComment = () => (
    <ModalStep header="Add your first comment">
      <p>
        The extension is installed and the launcher has been added to the the
        page. While the launcher is open, you simply hover then click on any
        element you would liket to add a comment.
      </p>
      <p>Give it a try by adding a comment to the purple '/Test button'</p>
    </ModalStep>
  )

  renderMakeWorkspace = () => (
    <ModalStep header="Install Extension">
      <p>Make a workspace</p>
    </ModalStep>
  )

  renderWaiting = () => <ModalStep header="..." />

  classes = index => {
    const classes = []
    if (this.state.step === index) {
      classes.push('active')
    }
    if (this.state.step > index) {
      classes.push('completed')
    }
    return classes.join(' ')
  }

  isComplete = index => {
    return this.state.step > index
  }

  extensionInstalled = message => {
    console.log('received extension message', message)

    this.setState({ installed: true })
  }

  onExtensionMessage = message => {
    console.log('received extension message', message)
  }

  render() {
    const {
      state: { step, db },
    } = this

    return (
      <div className="stage">
        <Template />
        <div className="fg">
          <ExtensionBridge
            onInstalled={this.extensionInstalled}
            onMessage={this.onExtensionMessage}
            render={() => (
              <React.Fragment>
                <div className="steps">
                  <ul className="list-unstyled">
                    <li className={this.classes(0)}>
                      {this.isComplete(0) && (
                        <Icon className="icon" icon={checkCircle} />
                      )}
                      Sign up
                    </li>
                    <li className={this.classes(1)}>
                      {this.isComplete(1) && (
                        <Icon className="icon" icon={checkCircle} />
                      )}
                      Install
                    </li>
                    <li className={this.classes(2)}>
                      {this.isComplete(2) && (
                        <Icon className="icon" icon={checkCircle} />
                      )}
                      Make a comment
                    </li>
                    <li className={this.classes(3)}>
                      {this.isComplete(3) && (
                        <Icon className="icon" icon={checkCircle} />
                      )}
                      Create a workspace
                    </li>
                  </ul>
                </div>
                <div>
                  {db == null && this.renderWaiting()}
                  {step === 0 && db != null && this.renderSignup()}
                  {step === 1 && db != null && this.renderInstall()}
                  {step === 2 && db != null && this.renderMakeComment()}
                  {step === 3 && db != null && this.renderMakeWorkspace()}
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    )
  }
}
