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
    const userDoc = await usersRef.doc(userId).get();
    const user = userDoc.data();
    console.log("----------------");
    console.log("User: ", user.email);

    const workspaces = [];
    // workspace
    console.log("Updating workspaces");
    const workspacesSnapshot = await workspaceRef
      .where(`users.${userId}.role`, ">", "")
      .get();
    workspacesSnapshot.forEach(async doc => {
      const data = doc.data();
      workspaces.push(doc.id);
      console.log("belong to ", doc.id, "name", data.name);
    });

    console.log("Found ", workspaces.length);

    const newRecord = Object.assign({}, user, {
      workspaces: workspaces.reduce(
        (acc, id) => Object.assign(acc, { [id]: true }),
        {}
      )
    });
    console.log(JSON.stringify(newRecord, null, 4));
    await userDoc.ref.update(newRecord);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// main runner
program.option("-u, --userId <userId>", "User Id").parse(process.argv);

if (!program.userId) {
  console.log("Expected a user Id");
  process.exit(1);
}

runProgram(program.userId, program.email);
