import React from 'react'
import api from '../../api'
import './signup.css'

import { Redirect } from '@reach/router'

import { Icon } from 'react-icons-kit'
import { ic_check_circle as checkCircle } from 'react-icons-kit/md/ic_check_circle'
import Template from './Template'
import SignupForm from './SignupForm'
import MakeComment from './MakeComment'
import MakeWorkspace from './Workspace'
import Install from './Install'

export default class Signup extends React.Component {
  state = {
    step: 0,
    isSubmitting: false,
    installed: false,
    initialized: false,
    complete: false,
    error: null,
    onboardComplete: false,
  }

  async componentDidMount() {
    this.api = api.connect()

    const user = await this.api.getCurrentUser()
    const refreshToken = await this.api.getRefreshToken()

    this.setState({
      step: user ? 1 : 0,
      initialized: true,
      refreshToken: refreshToken,
      onboardComplete: (user && user.onboardComplete) || false,
    })
  }

  nextStep = () => {
    this.setState(state => ({ step: state.step + 1 }))
  }

  handleSignup = values => {
    this.setState({ isSubmitting: true })
    this.api
      .signup(values.email, values.password, values.displayName)
      .then(response =>
        this.api.login(response.access_token, response.refresh_token)
      )
      .then(async () => {
        const refreshToken = await this.api.getRefreshToken()
        this.setState({ refreshToken })
      })
      .then(() => {
        this.nextStep()
      })
      .catch(error => {
        this.setState({ error })
      })
  }

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

  onComplete = async () => {
    await this.api.updateUser('onboardComplete', true)
    this.nextStep()
  }

  render() {
    const {
      state: { step, initialized, onboardComplete, refreshToken },
    } = this

    if (step === 4 || onboardComplete) {
      return <Redirect to="/app/account" noThrow />
    } else if (!initialized) {
      return null
    }

    return (
      <div className="stage">
        <Template />
        <div className="fg">
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
            {initialized && (
              <React.Fragment>
                {step === 0 && (
                  <SignupForm
                    onSubmit={this.handleSignup}
                    isSubmitting={this.state.isSubmitting}
                  />
                )}
                {step === 1 && (
                  <Install
                    onInstalled={this.nextStep}
                    refreshToken={refreshToken}
                  />
                )}
                {step === 2 && (
                  <MakeComment api={this.api} onCommentAdded={this.nextStep} />
                )}
                {step === 3 && (
                  <MakeWorkspace
                    onWorkspaceAdded={this.onComplete}
                    onWorkspaceSkip={this.onComplete}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}
