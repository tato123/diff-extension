import firebase from "firebase";

// actions
import actions from "./actions";
import { operations as userOperations } from "../users";
import { actions as selectorActions } from "../selectors";

/**
 * Fetches diffs from firestore
 *
 * @param {}
 * @returns {Function}
 */
const getDiffs = () => (dispatch, getState, { db }) => {
  let unsubscribe = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("events")
        .where("type", "==", "diff")
        .where("url", "==", window.location.href)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();

            // adds a new diff
            dispatch(
              actions.addDiff({
                id: doc.id,
                ...data
              })
            );

            // fetches single user
            dispatch(userOperations.fetchUser(data.meta.userId));

            // add our new selectors
            dispatch(
              selectorActions.addSelector({
                id: data.selector,
                type: data.type,
                typeId: doc.id
              })
            );
          });
        });
    } else {
      unsubscribe && unsubscribe();
    }
  });
};

export default {
  getDiffs
};
