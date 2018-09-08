import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

interface WorkspaceContext extends functions.EventContext {
  workspaceId: string;
}

// exports.onCreateWorkspaceUpdateUser = functions.firestore
//   .document("workspace/{workspaceId}")
//   .onCreate(async (snap, context: WorkspaceContext) => {
//     const workspace = snap.data();

//     const usersRef = db.collection("users");

//     console.log("my params", context.params);

//     await Promise.all(
//       Object.keys(workspace.users).map(async userId => {
//         const doc = await usersRef.doc(userId).get();
//         const userRecord = doc.data();

//         userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
//           [context.params.workspaceId]: true
//         });

//         return doc.ref.update(userRecord);
//       })
//     );
//   });

// exports.onUpdateWorkspaceUpdateUser = functions.firestore
//   .document("workspace/{workspaceId}")
//   .onUpdate(async (change, context: WorkspaceContext) => {
//     const workspace = change.after.data();

//     const usersRef = db.collection("users");

//     await Promise.all(
//       Object.keys(workspace.users).map(async userId => {
//         const doc = await usersRef.doc(userId).get();
//         const userRecord = doc.data();

//         userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
//           [context.params.workspaceId]: true
//         });

//         return doc.ref.update(userRecord);
//       })
//     );
//   });
