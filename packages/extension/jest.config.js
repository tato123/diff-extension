// Jest configuration for api

module.exports = {
  name: "extension",
  displayName: "@diff/extension",
  verbose: true,
  testRegex: "/__tests__/.*.test.(js|ts|tsx)?$",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "<rootDir>/../../node_modules/ts-jest"
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
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  }
};
