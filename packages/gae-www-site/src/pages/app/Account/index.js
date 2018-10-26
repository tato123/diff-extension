import React from 'react';
import { Anchor, Header, StyleBoundary } from '@diff/shared-components';
import styled from 'styled-components';

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

const Test = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-2">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Anchor href="#account">My Account</Anchor>
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
          <LHeader as="h1">My Account Information</LHeader>
        </Card>
        <Card>
          <LHeader as="h1">My Billing information</LHeader>
        </Card>
        <Card>
          <LHeader as="h1">My settings</LHeader>
        </Card>
      </CardContainer>
    </div>
  </div>
);

export default Test;
