import { createSelector } from 'reselect';

const userEntityDomain = state => state.entities.users;

const getUserSelector = uid =>
  createSelector(userEntityDomain, user => user.byId[uid]);

export default {
  getUserSelector
};
