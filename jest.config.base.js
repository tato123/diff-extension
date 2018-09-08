module.exports = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "<rootDir>/../../node_modules/ts-jest/preprocessor.js"
  },
  moduleDirectories: ["node_modules", "<rootDir>/node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
};
