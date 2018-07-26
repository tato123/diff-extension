import actions from "./actions";
import selectors from "./selectors";

/**
 *
 * @param {{}} action
 * @returns {Function}
 */
const fetchUser = uid => async (dispatch, getState, { db }) => {
  try {
    const state = getState();
    const user = selectors.getUserSelector(uid)(state);

    if (user) {
      console.warn("already have uid", uid);
      return;
    }

    dispatch(actions.fetchUserRequest(uid));

    const doc = await db
      .collection("users")
      .doc(uid)
      .get();

    if (doc.exists) {
      return dispatch(actions.fetchUserSuccess(doc.data()));
    }
    return dispatch(actions.fetchUserFailed("Unable to get user data"));
  } catch (error) {
    console.log(error);
    return dispatch(actions.fetchUserFailed(error.message));
  }
};

export default {
  fetchUser
};
