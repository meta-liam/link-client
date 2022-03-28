module.exports = {
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
      "/node_modules/",
      "/dist/",
      "/__test__/",
      "<rootDir>/test/_mock_/",
  ],
  testMatch: [
    '<rootDir>/src/**/*.{spec,test}.{js,ts}',
  ],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
};
