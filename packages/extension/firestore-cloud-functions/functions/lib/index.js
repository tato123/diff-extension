"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.onCreateWorkspaceUpdateUser = functions.firestore
    .document("workspace/{workspaceId}")
    .onCreate((snap, context) => {
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
    .onUpdate((change, context) => {
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
//# sourceMappingURL=index.js.map