import React from 'react';
import { Anchor, Header, Space } from '@diff/shared-components';
import styled from 'styled-components';
import User from '../../../components/User';

const CardContainer = styled.div`
  > div:first-child {
    margin-top: 0px;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  min-height: 200px;
  padding: 32px;
  margin-top: 32px;
  border-radius: 8px;
`;

const LHeader = styled(Header)`
  color: var(--color-purple-2);
`;

const Account = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-2">
        <ul className="nav flex-column">
          <li className="nav-item active">
            <Anchor href="#account">My projects</Anchor>
          </li>
          <li className="nav-item">
            <Anchor href="#account">Billing</Anchor>
          </li>
          <li className="nav-item">
            <Anchor href="#account">Settings</Anchor>
          </li>
        </ul>
      </div>
      <CardContainer className="col">
        <Card>
          <LHeader as="h1">
            My Projects 
            {' '}
            <small>(1 of 1)</small>
          </LHeader>
          <Space top={6}>
            <User>
              {user =>
                user ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(user.workspaces).map(id => (
                        <tr key={id}>
                          <td>{user.workspaces[id].name}</td>
                          <td>{user.workspaces[id].users[user.sub].role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div />
                )
              }
            </User>
          </Space>
        </Card>
        <Card>
          <LHeader as="h1">My Billing information</LHeader>
          <Space top={6}>
            <div>Current Plan: Free</div>
            <div>Upgrade Plan</div>
          </Space>
        </Card>
        <Card>
          <LHeader as="h1">My settings</LHeader>
        </Card>
      </CardContainer>
    </div>
  </div>
);

export default Account;
