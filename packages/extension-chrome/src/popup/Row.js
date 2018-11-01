import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  padding: var(--df-space-4);

  small {
    font-size: 13px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  color: var(--df-text-color-light);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: var(--df-space-2);
  display: block;
`;

export default function Row({ label, children, ...rest }) {
  return (
    <Page {...rest}>
      {label && <Title>{label}</Title>}
      {children}
    </Page>
  );
}
