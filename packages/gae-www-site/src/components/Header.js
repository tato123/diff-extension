import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mark from '../images/mark.png';

const NavContainer = styled.nav`
  height: 78px;
  min-height: 78px;
  max-height: 78px;

  @media (max-width: 575.98px) {
    padding-left: 15px !important;
    padding-right: 15px !important;

    .navbar-brand img {
      height: auto;
      min-height: auto;
      width: 110px;
    }
  }
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 auto;
`;

const Header = ({ client, rightMenuItem }) => (
  <NavContainer className=" navbar navbar-expand-lg navbar-light bg-white container-lg">
    <div className="container">
      <a className="navbar-brand" href="/">
        <img src={mark} className="d-inline-block align-top" alt="" />
      </a>
      {!client && (
        <React.Fragment>
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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Comment 
                  {' '}
                  <span className="sr-only">(current)</span>
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
        </React.Fragment>
      )}
      {rightMenuItem != null && <FlexEnd>{rightMenuItem()}</FlexEnd>}
    </div>
  </NavContainer>
);

Header.propTypes = {
  client: PropTypes.bool,
  rightMenuItem: PropTypes.func
};

Header.defaultProps = {
  client: false,
  rightMenuItem: () => {}
};

export default Header;
