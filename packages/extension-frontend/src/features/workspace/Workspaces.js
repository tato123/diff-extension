import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors } from './redux';

const withState = connect(
  createStructuredSelector({
    workspaces: selectors.allWorkspacesSelector
  })
);

const Workspaces = ({ children, workspaces }) => children(workspaces);

export default withState(Workspaces);
