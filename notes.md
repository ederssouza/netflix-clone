# Notes

## Jest

### Configuration

```bash
yarn add -D jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest identity-obj-proxy
```

```js
// package.json
{
  // ...
  "scripts": {
    // ...
    "test": "yarn jest",
    "test:coverage": "yarn jest --coverage"
  },
  // ...
}
```