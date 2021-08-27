# Notes

## Jest

### Configuration

```bash
# install dependnecies
yarn add -D jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest identity-obj-proxy
```

```js
// package.json scripts
{
  // ...
  "scripts": {
    // ...
    "test": "jest --maxWorkers=50%",
    "test:watch": "jest --watch --maxWorkers=25%",
    "test:ci": "jest --runInBand",
    "test:coverage": "jest --coverage  --maxWorkers=50%"
  },
  // ...
}
```

```js
// jest.config.js
module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setupTests.ts'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy'
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx'
  ],
  coverageReporters: ['json', 'lcov']
}
```