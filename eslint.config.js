import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

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
