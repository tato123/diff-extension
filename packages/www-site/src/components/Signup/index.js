import React from 'react'
import { redirectTo } from '@reach/router'
import { handleLogin, isLoggedIn } from '../../utils/auth'

import './signup.css'

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      redirectTo(`/app/profile`)
    }

    return (
      <div>
        <div className="fg">
          <h3>Sign up for Diff</h3>
          <form className="app">
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
        </div>

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
      </div>
    )
  }
}

export default Login
