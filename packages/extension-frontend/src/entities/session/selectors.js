import { createSelector } from 'reselect';

const sessionSelector = state => state.entities.session;

const currentUserIdSelector = () =>
  createSelector(sessionSelector, user => user.uid);

const currentWorkspaceSelector = () =>
  createSelector(sessionSelector, user => user.workspaceId);

const formSelector = () =>
  createSelector(sessionSelector, user => user.meta.form);

const errorSelector = () =>
  createSelector(sessionSelector, user => user.meta.error);

const isSubmittingSelector = () =>
  createSelector(sessionSelector, user => user.meta.submitting);

export default {
  currentWorkspaceSelector,
  currentUserIdSelector,
  formSelector,
  errorSelector,
  isSubmittingSelector
};
