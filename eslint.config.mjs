import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  js.configs.recommended,
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended"
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescript,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off",
      "no-unsafe-optional-chaining": "off",
    },
  },
  prettierConfig,
];
