![CircleCI](https://img.shields.io/circleci/build/github/markormesher/eslint-config)

# @markormesher/eslint-config

Standard ESLint/Prettier config for TypeScript/React/SCSS projects. Published as its own package to reduce duplication between projects.

Intended for projects using ESLint's "new" [flat config format](https://eslint.org/blog/2022/08/new-config-system-part-2).

## Installation and Usage

Install from GitHub:

```shell
pnpm add --save-dev @markormesher/eslint-config@https://github.com/markormesher/eslint-config#semver:^0.2.0
# or
yarn add --dev @markormesher/eslint-config@https://github.com/markormesher/eslint-config#semver:^0.2.0
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

The plugins that this project uses are bundled with it as direct dependencies. The following are peer dependencies:

- [ESLint](https://www.npmjs.com/package/eslint) @ >= 10.0.0, <11.0.0
- [TypeScript](https://www.npmjs.com/package/typescript) @ >=3.3.1
