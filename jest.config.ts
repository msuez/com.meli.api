import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  setupFiles: [
    '<rootDir>/setupTests.ts'
  ],
  testEnvironment: "jest-environment-node",
  verbose: true,
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "src/errors/**/*.ts"
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupDatabase.ts'],
};

export default config;
