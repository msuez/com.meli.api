import js from "@eslint/js";
import globals from "globals";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,js,mjs,cjs}"],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.browser,
        jest: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "jest": "eslint-plugin-jest",
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      "jest/consistent-test-it": ["error", { "fn": "it" }],
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/valid-expect": "error",
    },
    env: {
      node: true,
      jest: true,
    },
  },
];
