import actions from "./actions";
import { operations as userOperations } from "../users";
import { actions as selectorActions } from "../selectors";
import firebase from "firebase";

/**
 * Fetches comments from firestore
 *
 * @param {}
 * @returns {Function}
 */
const fetchComments = () => (dispatch, getState, { db }) => {
  let unsubscribe = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("events")
        .where("type", "==", "comment")
        .where("url.hostname", "==", window.location.hostname)
        .where("url.pathname", "==", window.location.pathname)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();

            console.warn("[Ambiguous add, update, or delete]");
            dispatch(
              actions.addComment({
                id: doc.id,
                ...data
              })
            );

            // resolve our user
            dispatch(userOperations.fetchUser(data.meta.userId));

            // adds a new selector
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
  fetchComments
};
