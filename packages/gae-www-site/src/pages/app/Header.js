import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Space } from '@diff/shared-components';
import mark from '../../images/mark.png';
import UserContext from '../../utils/auth';

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

const Text = styled.span`
  color: var(--df-text-colo);
  font-weight: bold;
  align-self: center;
  display: block;
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 auto;
  align-items: center;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-top: -6px;
`;

const Header = ({ client }) => (
  <UserContext.Consumer>
    {value => (
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
          <FlexEnd>
            {value.user && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Space right={4}>
                    <Text>My Account</Text>
                  </Space>
                </li>
                <li className="nav-item">
                  <Avatar src={value.user.picture} />
                </li>
              </ul>
            )}
          </FlexEnd>
        </div>
      </NavContainer>
    )}
  </UserContext.Consumer>
);

Header.propTypes = {
  client: PropTypes.bool
};

Header.defaultProps = {
  client: false
};

Header.contextType = UserContext;

export default Header;
