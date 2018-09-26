const { google } = require("googleapis");
const storage = google.storage("v1");

// const storage = google.storage({
//   version: "v1",
//   auth: process.env.GCLOUD_API_KEY
// });

let request;

async function init() {
  const client = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/devstorage.read_only"]
  });

  const projectId = await google.auth.getDefaultProjectId();

  request = {
    projectId,
    bucket: "diff-frontend",
    auth: client
  };
}

init();

exports.listObjects = async () => {
  if (request == null) {
    await init();
  }
  return storage.objects.list(request);
};
