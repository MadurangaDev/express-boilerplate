import { defineConfig } from "vitest/config";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Alias } from "vite";

type TsConfig = {
  compilerOptions?: {
    paths?: Record<string, string[]>;
  };
};

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const tsconfig = JSON.parse(readFileSync(resolve(rootDir, "tsconfig.json"), "utf-8")) as TsConfig;

const aliases: Alias[] = [];

for (const [find, replacements] of Object.entries(tsconfig.compilerOptions?.paths ?? {})) {
  const replacement = replacements[0];

  if (!replacement) {
    continue;
  }

  const normalizedFind = find.replace(/\/\*$/, "");
  const normalizedReplacement = fileURLToPath(
    new URL(replacement.replace(/^\.\//, "./").replace(/\/\*$/, ""), import.meta.url),
  );

  if (find.endsWith("/*")) {
    aliases.push({
      find: new RegExp(`^${normalizedFind.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/(.*)$`),
      replacement: `${normalizedReplacement}/$1`,
    });
    continue;
  }

  aliases.push({
    find: normalizedFind,
    replacement: normalizedReplacement,
  });
}

export default defineConfig({
  resolve: {
    alias: aliases,
  },
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: ["dist/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.ts"],
      exclude: ["src/server.ts", "src/types/**", "dist/**"],
    },
  },
});
