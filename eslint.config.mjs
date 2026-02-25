import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxa11y from "eslint-plugin-jsx-a11y";
import inferno from "eslint-plugin-inferno";
import globals from "globals";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    plugins: {
      inferno: inferno,
      rules: inferno.configs.recommended,
    },
  },
  {
    plugins: {
      "jsx-a11y": jsxa11y,
    },
    rules: jsxa11y.configs.recommended.rules,
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.node,
    },
  },
  // For some reason this has to be in its own block
  {
    ignores: [
      "*.mjs",
      "lemmy-js-client-main",
      "lemmy-js-client-v0.19",
      "webpack.config.js",
      "tailwind.config.js",
      "src/shared/build-config.js",
      "src/api_tests",
      "**/*.png",
      "**/*.css",
      "**/*.scss",
      "**/*.svg",
      "dist/*",
      ".yalc/*",
      "lemmy-docs",
      "**/*.test.ts",
    ],
  },
  {
    files: ["src/**/*.js", "src/**/*.mjs", "src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-useless-constructor": "error",
      "no-console": [
        "error",
        { allow: ["warn", "error", "info", "debug", "assert"] },
      ],
      "inferno/jsx-boolean-value": "error",
      "inferno/jsx-props-class-name": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/no-unsafe-call": 0,
      "@typescript-eslint/no-unsafe-return": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unsafe-argument": 0,
      "@typescript-eslint/no-misused-promises": 0,
    },
  },
];
