import React from 'react';
import { Anchor } from '@diff/shared-components';

const Test = () => (
  <div className="container-lg">
    <div className="row">
      <div className="col-md-2">
        <Anchor href="/app/account/me">Test</Anchor>
        <Anchor href="/app/account/billing">Test</Anchor>
      </div>
      <div className="col">
        <div>test</div>
      </div>
    </div>
  </div>
);

export default Test;
