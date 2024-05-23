import js from "@eslint/js"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettierConfig from "eslint-config-prettier"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import reactRefreshPlugin from "eslint-plugin-react-refresh"
import tailwindPlugin from "eslint-plugin-tailwindcss"
import globals from "globals"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, React: "readonly" },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prefer-const": "error",

      ...tsPlugin.configs.recommended.rules,

      ...reactHooksPlugin.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      ...tailwindPlugin.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"],
      },
    },
  },
  prettierConfig,
]
