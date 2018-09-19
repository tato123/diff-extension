import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";

admin.initializeApp();

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

interface WorkspaceContext extends functions.EventContext {
  workspaceId: string;
}

exports.onCreateWorkspaceUpdateUser = functions.firestore
  .document("events/{eventId}")
  .onCreate(async (snap, context: WorkspaceContext) => {
    const event = snap.data();

    if (event.type === "comment" && "workspaceId" in event.meta) {
      google.auth
        .getClient({
          scopes: ["https://www.googleapis.com/auth/cloud-platform"]
        })
        .then(authClient => {
          const task = {
            app_engine_http_request: {
              http_method: "POST",
              relative_url: "/log_payload"
            }
          };

          if (options.payload !== undefined) {
            task.app_engine_http_request.payload = Buffer.from(
              options.payload
            ).toString("base64");
          }

          if (options.inSeconds !== undefined) {
            task.schedule_time = new Date(
              options.inSeconds * 1000 + Date.now()
            ).toISOString();
          }

          const request = {
            parent: `projects/${project}/locations/${location}/queues/${queue}`, // TODO: Update placeholder value.
            resource: {
              task: task
            },
            auth: authClient
          };

          console.log("Sending task %j", task);
          return cloudtasks.projects.locations.queues.tasks.create(request);
        })
        .then(response => {
          console.log("Created task.", response.name);
          console.log(JSON.stringify(response, null, 2));
        })
        .catch(console.error);
    }
  });

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
