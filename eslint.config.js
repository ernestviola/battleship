import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
    languageOptions: {
      globals: {
        console: "readonly",
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    ...jestPlugin.configs["flat/recommended"],
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
    },
  },
]);
