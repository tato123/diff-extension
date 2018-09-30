import React from 'react';
import { render } from 'react-dom';
import { initApi } from '@diff/common';
import Popup from './Popup';

const authDomain = 'diff.auth0.com';
const clientId = 'hza50RUb2qA-F5dZ4cuBVH324yMzuURc';
const api = initApi();

render(
  <Popup authDomain={authDomain} clientId={clientId} api={api} />,
  document.querySelector('#popup-root')
);
