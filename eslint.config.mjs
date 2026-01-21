import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/migrations/**",
    ],
  },
  ...compat.config({
    extends: ["eslint:recommended", "next/core-web-vitals", "next/typescript"],
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
  }),
];

export default eslintConfig;
