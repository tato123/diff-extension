import actions from "./actions";

/**
 *
 * @param {{}} action
 * @returns {Function}
 */
const fetchUser = uid => async (dispatch, getState, { db }) => {
  try {
    dispatch(actions.fetchUserRequest());

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
