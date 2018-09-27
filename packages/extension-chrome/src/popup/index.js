import React from 'react';
import { render } from 'react-dom';
import Popup from './Popup';

const authDomain = 'diff.auth0.com';
const clientId = 'hza50RUb2qA-F5dZ4cuBVH324yMzuURc';

render(
  <Popup authDomain={authDomain} clientId={clientId} />,
  document.querySelector('#popup-root')
);
