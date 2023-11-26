module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: '/jest/coverage',
  testMatch: ['**/tests/**/*.test.ts'],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80
    }
  },
  setupFiles: ['./tests/setup.ts'],
}
