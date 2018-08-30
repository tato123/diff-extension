import { initializeFirestore } from "./firestore";

import userFactory from "./user";
import commentsFactory from "./comments";
import workspaceFactory from "./workspace";

export default () => {
  const db$ = initializeFirestore();
  const obs = {
    user: userFactory(db$),
    comments: commentsFactory(db$),
    workspace: workspaceFactory(db$),
    db$
  };

  window.obs = obs;

  return obs;
};
