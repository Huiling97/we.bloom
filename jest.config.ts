/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/client/app/test/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: {
                metaObjectReplacement: { env: 'env123' },
              },
            },
          ],
        },
      },
    ],
  },
};
