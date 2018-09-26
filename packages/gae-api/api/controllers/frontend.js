const path = require("path");
const semver = require("semver");
const fs = require("fs");

const Storage = require("@google-cloud/storage");
const { listObjects } = require("../helpers/storage");
const _ = require("lodash");
const requestProxy = require("express-request-proxy");

// Your Google Cloud Platform project ID
const projectId = process.env.GCLOUD_PROJECT_ID;

// Creates a client
const storage = new Storage({
  projectId: projectId
});

// The name for the new bucket
const bucketName = process.env.GCLOUD_FRONTEND_BUCKET;

const readStorageBucketVersions = async () => {
  return listObjects().then(response => {
    const files = response.data.items;

    return _.chain(files)
      .map(gcresult => gcresult.name.split("/")[0])
      .uniq()
      .value();
  });
};

const sendCloudStorageFile = async (version, file, req, res, next) => {
  const remoteFile = storage.bucket(bucketName).file(`${version}/${file}`);
  if (!remoteFile.exists) {
    return Promise.reject(new Error("file not found"));
  }

  const url = `https://storage.googleapis.com/diff-frontend/${version}/${file}`;
  requestProxy({
    url
  })(req, res, next);
};

const mapVersion = version => availableVersions => {
  if (version === "latest") {
    const sorted = availableVersions.sort(semver.compare);
    console.log("versions", sorted);
    return sorted[sorted.length - 1];
  }
  return version;
};

const gcloudFrontendMiddleware = (req, res, next) => {
  let version = req.params.version;
  const file = req.params.file;

  readStorageBucketVersions()
    .then(mapVersion(version))
    .then(version => {
      return sendCloudStorageFile(version, file, req, res, next);
    })
    .catch(err => {
      res.json(404, { err: err.message });
    });
};

if (process.env.NODE_ENV === "production") {
  exports.library = gcloudFrontendMiddleware;
} else {
  // do this
  const webpack = require("webpack");
  const middleware = require("webpack-dev-middleware");
  const file = path.resolve(
    __dirname,
    "../../../extension/configs/webpack.frontend.js"
  );
  if (!fs.existsSync(file)) {
    throw new Error("file doesnt exist " + file);
  }
  process.env.NODE_ENV = "development";
  const options = require(file)(process.env.NODE_ENV);
  const compiler = webpack(options);

  exports.library = middleware(compiler, {
    noInfo: true
  });
  exports.hotLoader = require("webpack-hot-middleware")(compiler);
}
