const admin = require("firebase-admin");
const db = require("../migrations/connect")();
const program = require("commander");
const _ = require("lodash");
const mailer = require("../../api/helpers/email");

// references
const usersRef = db.collection("users");
const activityRef = db.collection("activity");
const commentsRef = db.collection("events").where("type", "==", "comment");

const getComments = async (uid, workspaceId) => {
  const querySnapshot = await commentsRef
    .where("meta.workspaceId", "==", workspaceId)
    .get();

  const comments = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    if (data.meta.userId !== uid) {
      comments.push({ id: doc.id, data: doc.data() });
    }
  });
  return comments;
};

const getSeenForUser = async uid => {
  const querySnapshot = await activityRef
    .doc(uid)
    .collection("seen")
    .get();
  const seen = [];
  querySnapshot.forEach(doc => {
    seen.push(doc.id);
  });
  return seen;
};

async function runProgram(userId, email) {
  try {
    // get the user
    const userDoc = await usersRef.doc(userId).get();
    const user = userDoc.data();

    const workspaceComments = await Promise.all(
      Object.keys(user.workspaces).map(workspaceId =>
        getComments(user.uid, workspaceId)
      )
    );

    // all comments
    const comments = _.union(_.flatten(workspaceComments));
    const commentIds = _.map(comments, comment => comment.id);

    const seen = await getSeenForUser(user.uid);

    const unseen = _.difference(commentIds, seen);

    const unseenComments = _.sortBy(
      _.map(unseen, id => {
        return _.find(comments, comment => comment.id === id).data;
      }),
      ["meta.created"]
    );

    await mailer.pendingComments(user.email, unseenComments);
    console.log(unseenComments);

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

runProgram(program.userId);
