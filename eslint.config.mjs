import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: "./tsconfig.json" },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["interface", "typeAlias"],
          format: null,
          custom: {
            regex: "^I([A-Z][a-z0-9]*|[A-Z]{2,})+$",
            match: true,
          },
        },
      ],
    },
  },
  {
    files: ["src/**/*.d.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: "./tsconfig.json" },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/naming-convention": "off",
    },
  },
  {
    ignores: ["dist/", "node_modules/"],
  },
];
