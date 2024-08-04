import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from "eslint-plugin-unused-imports"; // 使ってないimportの検知
import ngrx from "@ngrx/eslint-plugin/v9/index.js"; //少しやり方考える、たぶん動いてる()
import simpleImportSort from "eslint-plugin-simple-import-sort";// importをsortしてくれる,flat-config対応してるやつ


export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files:["**/*.ts"],
    extends:[
      ...ngrx.configs.all,
    ],
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules:{
      // importSort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // unused-import
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
    }
  }
);
