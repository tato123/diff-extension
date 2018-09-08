"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
exports.onCreateWorkspaceUpdateUser = functions.firestore
    .document("workspace/{workspaceId}")
    .onCreate((snap, context) => __awaiter(this, void 0, void 0, function* () {
    const workspace = snap.data();
    const usersRef = db.collection("users");
    console.log("my params", context.params);
    yield Promise.all(Object.keys(workspace.users).map((userId) => __awaiter(this, void 0, void 0, function* () {
        const doc = yield usersRef.doc(userId).get();
        const userRecord = doc.data();
        userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
            [context.params.workspaceId]: true
        });
        return doc.ref.update(userRecord);
    })));
}));
exports.onUpdateWorkspaceUpdateUser = functions.firestore
    .document("workspace/{workspaceId}")
    .onUpdate((change, context) => __awaiter(this, void 0, void 0, function* () {
    const workspace = change.after.data();
    const usersRef = db.collection("users");
    yield Promise.all(Object.keys(workspace.users).map((userId) => __awaiter(this, void 0, void 0, function* () {
        const doc = yield usersRef.doc(userId).get();
        const userRecord = doc.data();
        userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
            [context.params.workspaceId]: true
        });
        return doc.ref.update(userRecord);
    })));
}));
//# sourceMappingURL=index.js.map