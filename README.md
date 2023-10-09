![CircleCI](https://img.shields.io/circleci/build/github/markormesher/eslint-config)
![npm](https://img.shields.io/npm/v/@markormesher/eslint-config)

# @markormesher/eslint-config

Standard ESLint/Prettier config for TypeScript/React/SCSS projects. Published as its own package to reduce duplication between projects.

Intended for projects using ESLint's "new" [flat config format](https://eslint.org/blog/2022/08/new-config-system-part-2).

## Installation and Usage

Install with yarn:

```shell
yarn add --dev @markormesher/eslint-config
```

Add it to `eslint.config.js`:

```js
import config from "@markormesher/eslint-config";

export default config;
```

Or, if you want to apply overrides:

```js
import config from "@markormesher/eslint-config";

export default [
  ...config,
  {
    "files": ["**/*.ts"],
    // overrides for TS files...
  },
];
```

### Dependencies

These are peer dependencies, expected to be installed in the project but not provided by this package.

- [ESLint](https://www.npmjs.com/package/eslint) @ >= 7.0.0, <9.0.0
- [TypeScript](https://www.npmjs.com/package/typescript) @ >=3.3.1, <5.1.0
