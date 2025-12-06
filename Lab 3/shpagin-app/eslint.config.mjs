import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  // Базовые правила
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Next.js
  ...nextVitals,
  ...nextTs,

  // Prettier (после Next.js!)
  prettierConfig,

  // Игноры
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/*.config.js",
    "**/*.config.ts",
  ]),

  // Import Sort
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Node.js builtins
            ["^\\u0000"],
            ["^node:"],

            // 2. React + Next.js
            ["^react$", "^next/"],

            // 3. External packages
            ["^@?\\w"],

            // 4. Internal (@/*)
            ["^@/lib/", "^@/components/", "^@/types/", "^@/hooks/"],

            // 5. Parent imports
            ["^\\.\\.(?!/)", "^\\.\\./$"],

            // 6. Sibling imports
            ["^\\./"],

            // 7. Styles
            ["^.+\\.(css|scss|sass|less)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },

  // Дополнительные правила
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },
]);

export default eslintConfig;
