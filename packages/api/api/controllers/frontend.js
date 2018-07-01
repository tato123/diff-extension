const path = require("path");
const semver = require("semver");
const fs = require("fs");

const Storage = require("@google-cloud/storage");
const { listObjects } = require("../helpers/storage");
const _ = require("lodash");
const request = require("request");

// Your Google Cloud Platform project ID
const projectId = process.env.GCLOUD_PROJECT_ID;

// Creates a client
const storage = new Storage({
  projectId: projectId
});

// The name for the new bucket
const bucketName = process.env.GCLOUD_FRONTEND_BUCKET;

const LOCAL_DIRECTORY = path.resolve(__dirname, process.env.LOCAL_DIR);

const readLocalFilesVersions = async () => {
  return new Promise((resolve, reject) => {
    fs.readdir(LOCAL_DIRECTORY, (err, items) => {
      if (err) {
        reject(err);
      }
      resolve(items);
    });
  });
};

const readStorageBucketVersions = async () => {
  return listObjects().then(response => {
    const files = response.data.items;

    return _.chain(files)
      .map(gcresult => gcresult.name.split("/")[0])
      .uniq()
      .value();
  });
};

const sendLocalFile = async (version, file, res) => {
  res.sendFile(path.resolve(LOCAL_DIRECTORY, version, file));
};

const sendCloudStorageFile = async (version, file, res) => {
  const remoteFile = storage.bucket(bucketName).file(`${version}/${file}`);
  if (!remoteFile.exists) {
    return Promise.reject(new Error("file not found"));
  }
  const gzip = require("zlib").createGzip();

  const [metadata] = await remoteFile.getMetadata();

  return new Promise((resolve, reject) => {
    res.setHeader("content-yype", `${metadata.contentType}; charset=utf-8`);
    res.setHeader("content-size", metadata.size);
    res.setHeader("content-encoding", "gzip");
    res.setHeader("cache-control", "max-age=0");
    remoteFile
      .createReadStream({ validation: false })
      .on("end", () => resolve())
      .on("error", err => reject(err))
      .pipe(gzip)
      .pipe(res);
  });
};

exports.library = async (req, res) => {
  let version = req.swagger.params.version.value;
  const file = req.swagger.params.file.value;

  try {
    // local directory
    const ENV = process.env.NODE_ENV;
    const versions =
      ENV === "production"
        ? await readStorageBucketVersions()
        : await readLocalFilesVersions();

    console.log("version", version);
    console.log("file", version);
    console.log("items", versions);

    if (version === "latest") {
      const sorted = versions.sort(semver.compare);
      console.log("versions", sorted);
      version = sorted[sorted.length - 1];
    }

    ENV === "production"
      ? await sendCloudStorageFile(version, file, res)
      : await sendLocalFile(version, file, res);
  } catch (err) {
    res.json(404, { err: err.message });
  }
};
