import { createSelector } from "reselect";
import _ from "lodash";

const commentsSelector = state => state.diff.comments;
const stateSelector = state => state;
const usersSelector = state => state.users;

const elementThreadSelector = thread =>
  createSelector(commentsSelector, stateSelector, (comments, state) =>
    _.chain(comments.byId[thread])
      .mapValues((value, key) => value.map(id => state[key].byId[id]))
      .values()
      .flatten()
      .sortBy("meta.created")
      .reverse()
      .value()
  );

const allUsersSelector = () =>
  createSelector(usersSelector, users => users.byId);

export default {
  elementThreadSelector,
  allUsersSelector
};
