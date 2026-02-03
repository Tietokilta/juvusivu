import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Prevent unused imports
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Prevent console.log in production
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Enforce strict equality
      "eqeqeq": ["error", "always"],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/migrations/**",
  ]),
]);

export default eslintConfig;
