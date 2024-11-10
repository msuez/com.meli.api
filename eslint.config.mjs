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
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
];
