const path = require("path");
const semver = require("semver");
const fs = require("fs");

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
  return Promise.reject(new Error(""));
};

const sendLocalFile = async (version, file, res) => {
  res.sendFile(path.resolve(LOCAL_DIRECTORY, version, file));
};

const sendCloudStorageFile = async (version, file, res) => {
  res.send(404);
};

exports.library = async (req, res) => {
  let version = req.swagger.params.version.value;
  const file = req.swagger.params.file.value;

  try {
    // local directory

    const versions =
      process.env.NODE_ENV === "production"
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

    process.env.NODE_ENV === "production"
      ? sendCloudStorageFile(version, file, res)
      : sendLocalFile(version, file, res);
  } catch (err) {
    res.send(404);
  }
};
