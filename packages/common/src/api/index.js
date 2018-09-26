import { initializeFirestore } from './firestore';
import userFactory from './user';
import commentsFactory from './comments';
import workspaceFactory from './workspace';
import authenticationFactory from './authentication';
import activityFactory from './activity';
import inviteFactory from './invites';

export default () => {
  const db$ = initializeFirestore();
  const obs = {
    user: userFactory(db$),
    comments: commentsFactory(db$),
    workspace: workspaceFactory(db$),
    auth: authenticationFactory(db$),
    activity: activityFactory(db$),
    invites: inviteFactory(db$)
  };

  return obs;
};
