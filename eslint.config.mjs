import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
    },
    settings: {
      react: {
        version: "18.2", // Explicitly set instead of "detect" to avoid detection issues
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    ignores: ["dist", ".astro", "node_modules"],
  },
];
