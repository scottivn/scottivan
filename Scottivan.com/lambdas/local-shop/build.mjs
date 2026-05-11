#!/usr/bin/env node
/**
 * Bundle each handler in src/handlers/ into its own dist/<handler>/index.mjs.
 * CloudFormation references the zipped output of each subdirectory as a
 * separate Lambda. The AWS SDK is provided by the Lambda runtime and excluded.
 */
import { build } from "esbuild";
import { mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcHandlers = join(__dirname, "src", "handlers");
const distDir = join(__dirname, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

const entries = (await readdir(srcHandlers))
  .filter((f) => f.endsWith(".ts"))
  .map((f) => f.replace(/\.ts$/, ""));

await Promise.all(
  entries.map(async (name) => {
    const outDir = join(distDir, name);
    await mkdir(outDir, { recursive: true });
    await build({
      entryPoints: [join(srcHandlers, `${name}.ts`)],
      bundle: true,
      platform: "node",
      target: "node20",
      format: "esm",
      outfile: join(outDir, "index.mjs"),
      // AWS SDK v3 is on the Lambda runtime — keep them external to shrink bundle
      external: ["@aws-sdk/*"],
      // Required for esm-on-Lambda
      banner: {
        js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
      },
      sourcemap: false,
      minify: true,
      logLevel: "info",
    });
    console.log(`  ✓ ${name}`);
  }),
);

console.log(`\nBundled ${entries.length} handlers → dist/`);
