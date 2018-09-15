import React from 'react'
import { redirectTo } from '@reach/router'
import { handleLogin, isLoggedIn } from '../../utils/auth'

import './signup.css'

const ModalStep = ({ header, children }) => (
  <div className="form">
    <h3>{header}</h3>
    {children}
  </div>
)

class Login extends React.Component {
  state = {
    step: 0,
  }

  gotoStep = step => {
    this.setState({ step })
  }

  handleSignup = evt => {
    evt.preventDefault()
    this.gotoStep(1)
    return false
  }

  renderSignup = () => (
    <ModalStep header="Sign up for Diff">
      <form className="app" onSubmit={this.handleSignup}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email:</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="email@domain.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Create a username"
          />
        </div>
        <div className="form-group space-lg">
          <label htmlFor="exampleInputPassword1">Password:</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
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

    if (isLoggedIn()) {
      redirectTo(`/app/profile`)
    }

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

export default Login
