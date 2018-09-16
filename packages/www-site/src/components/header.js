import React from 'react'
import mark from './Layout/images/mark.png'

const Header = ({ client }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white container-lg">
    <a className="navbar-brand" href="/">
      <img src={mark} className="d-inline-block align-top" alt="" />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon light" />
    </button>
    {!client && (
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Comment <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Collaborate
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Attachments
            </a>
          </li>
        </ul>
      </div>
    )}
  </nav>
)

export default Header
