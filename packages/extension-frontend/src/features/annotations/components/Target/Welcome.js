import React from 'react';
import styled from 'styled-components';
import { Header, Label, Anchor } from '@diff/shared-components';

const WelcomeContainer = styled.div`
  text-align: center;
  padding: var(--df-space-7);
`;

export default () => (
  <WelcomeContainer>
    <Header as="h1">Welcome</Header>
    <Label>
      Diff is the best tool ever. To get started, target an element on the page.
    </Label>
  </WelcomeContainer>
);
