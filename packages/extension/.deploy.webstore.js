const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.keys") });

const zipFolder = require("zip-folder");
const exec = require("child_process").exec;

let folder = path.resolve(__dirname, "./dist/chrome");
let zipName = "extension.zip";

// credentials and IDs from gitlab-ci.yml file
let REFRESH_TOKEN = process.env.WEBSTORE_REFRESH_TOKEN;
let EXTENSION_ID = process.env.WEBSTORE_EXTENSION_ID;
let CLIENT_SECRET = process.env.WEBSTORE_CLIENT_SECRET;
let CLIENT_ID = process.env.WEBSTORE_CLIENT_ID;

const nodeModulesDir = require.resolve("zip-folder").split("\\zip-folder")[0];

// to fetch it from node_modules
let webstoreLocation = path.resolve(nodeModulesDir, ".bin/webstore");

zipFolder(folder, zipName, function(err) {
  if (err) {
    console.log("oh no!", err);
    process.exit(1);
  } else {
    console.log(`Successfully Zipped ${folder} and saved as ${zipName}`);
    uploadZip(); // on successful zipping, call upload
  }
});

function uploadZip() {
  let cmd = getUploadCommand();
  exec(cmd, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
      process.exit(1);
    } else {
      console.log("Successfully Uploaded the zip to chrome web store");
      publishExtension(); // on successful upload, call publish
    }
  });
}

function publishExtension() {
  let cmd = getPublishCommand();
  exec(cmd, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
      process.exit(1);
    } else {
      console.log("Successfully published the newer version");
    }
  });
}

function getUploadCommand() {
  return `${webstoreLocation} upload --source ${zipName} --extension-id ${EXTENSION_ID} --client-id "${CLIENT_ID}" --client-secret ${CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}`;
}

function getPublishCommand() {
  return `${webstoreLocation} publish --extension-id ${EXTENSION_ID} --client-id "${CLIENT_ID}" --client-secret ${CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}`;
}
