const admin = require("firebase-admin");
const db = require("./connect")();
const program = require("commander");

// references
const usersRef = db.collection("users");
const eventsRef = db.collection("events");
const workspaceRef = db.collection("workspace");
const refreshTokens = db.collection("refreshToken");
const invitesRef = db.collection("invites");
const activityRef = db.collection("invites");

async function deleteCollection(collectionRef) {
  const list = [];
  const querySnapshot = await collectionRef.get();
  querySnapshot.forEach(doc => {
    list.push(doc);
  });
  console.log("Deleted: ", list.length);
  return Promise.all(list.map(doc => doc.ref.delete()));
}

async function deleteDoc(docRef) {
  const item = await docRef.get();
  return item.ref.delete();
}

/**
 * Command line action
 */
async function runProgram(userId, email) {
  try {
    // get the user email
    console.log("Deleting user table reference");

    const userDoc = await usersRef.doc(userId).get();
    userDoc.ref.delete();

    // cleanup activity
    console.log("Deleting activities");
    await deleteDoc(activityRef.doc(userId));

    // delete events
    console.log("Deleting events");
    await deleteCollection(eventsRef.where("meta.userId", "==", userId));

    // delete invites
    console.log("Deleting invites");
    await deleteCollection(invitesRef.where("email", "==", email));

    // refresh tokens
    console.log("Deleting tokens");
    await deleteCollection(refreshTokens.where("uid", "==", userId));

    // workspace
    console.log("Updating workspaces");
    const workspacesSnapshot = await workspaceRef
      .where(`users.${userId}.role`, ">", "")
      .get();
    workspacesSnapshot.forEach(async doc => {
      const data = doc.data();
      delete data.users[userId];
      doc.ref.update(data);
    });

    // delete user
    console.log("Removing from firebase");
    await admin.auth().deleteUser(userId);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// main runner
program
  .option("-u, --userId <userId>", "User Id")
  .option("-e, --email <email>", "Email")
  .parse(process.argv);

if (!program.userId) {
  console.log("Expected a user Id");
  process.exit(1);
}

runProgram(program.userId, program.email);
