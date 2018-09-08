// Jest configuration for api

module.exports = {
  name: "extension",
  displayName: "@diff/extension",
  verbose: true,
  testRegex: "/__tests__/.*.test.(js|ts|tsx)?$",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "<rootDir>/../../node_modules/ts-jest/preprocessor.js"
  },
  moduleDirectories: ["node_modules", "<rootDir>/node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/cypress/"],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "background/**/*.(js|ts)",
    "common/**/*.(js|ts)",
    "content/**/*.(js|ts)",
    "frontend/**/*.(js|ts)"
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
