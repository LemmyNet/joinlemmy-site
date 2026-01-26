import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import jsxa11y from "eslint-plugin-jsx-a11y";
import inferno from "eslint-plugin-inferno";
import globals from "globals";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
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
      "crawl.mjs",
      "generate_rss_feed.mjs",
      "generate_translations.mjs",
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
    ],
  },
  {
    files: ["src/**/*.js", "src/**/*.mjs", "src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": 0,
    },
  },
];
