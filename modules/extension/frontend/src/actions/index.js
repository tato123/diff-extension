import firebaseActions from "./firebase";
import userActions from "./user";

export default {
  ...firebaseActions,
  ...userActions
};
