import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const allFiles = ["**/*.js", "**/*.jsx", "**/*.cjs", "**/*.cjsx", "**/*.mjs", "**/*.mjsx", "**/*.ts", "**/*.tsx"];
const reactFiles = allFiles.filter((f) => f.endsWith("x"));
const tsFiles = allFiles.filter((f) => f.includes("ts"));

export default [
  // files to ignore across all projects
  {
    ignores: [
      // type definitions for styles
      "**/*.scss.d.ts",

      // dependencies and package manager components
      "node_modules/*",
      ".yarn/*",
      ".pnp.cjs",
      ".pnp.loader.mjs",
    ],
  },

  // apply to all: eslint recommended, prettier and import
  {
    files: allFiles,
    plugins: {
      js: js,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    settings: {
      // ensure that Yarn PnP dependencies are also treated as external
      "import/external-module-folders": ["node_modules", ".yarn"],
    },
    rules: {
      // customise prettier behaviour
      "prettier/prettier": [
        "error",
        {
          printWidth: 120,
          semi: true,
          trailingComma: "all",
          arrowParens: "always",
        },
      ],

      // enable some stricter rules on import/export formatting
      "import/group-exports": ["warn"],
      "import/newline-after-import": ["warn"],
      "import/no-useless-path-segments": ["warn"],
      "import/order": ["warn"],
    },
  },

  // apply react-specific rules
  {
    files: reactFiles,
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // apply type-aware rules
  {
    files: tsFiles,
    languageOptions: {
      parser: tsParser,

      // lines below are fair assumptions but may be overwritten by the consumer
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs["eslint-recommended"].rules,
      ...tsPlugin.configs["recommended-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,
      ...importPlugin.configs.typescript.rules,

      // the no-unresolved rule doesn't understand the fully-specified *.js paths for TS ES modules
      // unresolvable paths will cause parser and compiler errors anyway, so we can turn off the rule
      "import/no-unresolved": "off",

      // prefer types over interfaces
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
];
