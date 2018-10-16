import React from 'react';
import { render } from 'react-dom';
import { initApi, AuthProvider } from '@diff/common';
import Popup from './Popup';

const authProvider = new AuthProvider(
  process.env.AUTH0_DOMAIN,
  process.env.AUTH0_CLIENT_ID
);
const api = initApi();

render(
  <Popup authProvider={authProvider} api={api} />,
  document.querySelector('#popup-root')
);
