import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

interface WorkspaceContext extends functions.EventContext {
  workspaceId: string;
}

exports.onCreateWorkspaceUpdateUser = functions.firestore
  .document("workspace/{workspaceId}")
  .onCreate((snap, context: WorkspaceContext) => {
    const workspace = snap.data();

    Object.keys(workspace.users).forEach(userId => {
      const db = admin.firestore();
      db.collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          const userRecord = doc.data();
          userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
            [context.workspaceId]: true
          });

          return doc.ref.update(userRecord);
        })
        .catch(err => {
          console.error("unable to update user", err.message);
        });
    });
  });

exports.onUpdateWorkspaceUpdateUser = functions.firestore
  .document("workspace/{workspaceId}")
  .onUpdate((change, context: WorkspaceContext) => {
    const workspace = change.after.data();

    Object.keys(workspace.users).forEach(userId => {
      const db = admin.firestore();
      db.collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          const userRecord = doc.data();
          userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
            [context.workspaceId]: true
          });

          return doc.ref.update(userRecord);
        })
        .catch(err => {
          console.error("unable to update user", err.message);
        });
    });
  });
