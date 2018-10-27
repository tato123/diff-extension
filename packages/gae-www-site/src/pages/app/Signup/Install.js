import React from 'react';
import PropTypes from 'prop-types';
import ModalStep from './ModalStep';
import Anchor from './Anchor';
import ExtensionBridge from '../../../components/ExtensionBridge';

const Install = ({ onInstalled, refreshToken }) => (
  <ExtensionBridge
    onInstalled={onInstalled}
    refreshToken={refreshToken}
    render={() => (
      <ModalStep header="Install Diff">
        <p>
          Next, add the extension to your browser. Click the button to install
          Diff.
        </p>
        <Anchor
          target="_blank"
          href="https://chrome.google.com/webstore/detail/diff/emabkoeopfpoeighgafbhlldiemjdlbk"
        >
          Install
        </Anchor>
      </ModalStep>
    )}
  />
);

Install.propTypes = {
  onInstalled: PropTypes.func,
  refreshToken: PropTypes.string
};

Install.defaultProps = {
  onInstalled: () => {},
  refreshToken: null
};

export default Install;
