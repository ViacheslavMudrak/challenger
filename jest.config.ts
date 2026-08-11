import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/*.stories.tsx',
    '!**/.storybook/**',
    '!**/src/temp/**',
    '!**/scripts/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testRegex: '(/test/.*|\\.(test))\\.(ts|tsx)$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  modulePathIgnorePatterns: ['<rootDir>/build/', 'jest-test-results.json'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

export default config;
