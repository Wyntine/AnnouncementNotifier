#!/usr/bin/env -S npx tsx
/**
 * OS-aware entrypoint for Biome.
 *
 * - On NixOS, the npm-installed `@biomejs/biome` binary is glibc-linked and
 *   refuses to run. Biome is instead provided by Nix via `nix-shell`, which
 *   fetches and runs the Nix-packaged `biome` (pinned by nixpkgs).
 * - On other OSes, the installed npm package in `node_modules` is used.
 *
 * All arguments are forwarded to biome unchanged.
 *
 * Usage:
 *   npx tsx scripts/lint.ts <biome args...>
 *   // e.g.: npx tsx scripts/lint.ts check .
 *   //        npx tsx scripts/lint.ts format --write .
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { isNixOS } from "./lib/os.ts";

const args = process.argv.slice(2);

/** Shell-quote a single argument for embedding in a sh -c command line. */
function shellQuote(value: string): string {
  if (value === "") return "''";
  if (/^[A-Za-z0-9_./:=+-]+$/.test(value)) return value;
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function commandExists(cmd: string): boolean {
  const result = spawnSync("sh", ["-c", `command -v ${cmd}`], {
    stdio: "ignore",
  });
  return result.status === 0;
}

function exitWithError(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const nixOS = isNixOS();

if (nixOS) {
  if (!commandExists("nix-shell")) {
    exitWithError(
      "NixOS detected, but `nix-shell` is not available in PATH.\n" +
        "Install Nix (https://nixos.org/download.html) or run Biome via nix-shell.\n" +
        'Note: `nix-env` cannot run programs — `nix-shell -p biome --run "biome ..."` is required.',
    );
  }
  const command = ["biome", ...args].map(shellQuote).join(" ");
  const result = spawnSync("nix-shell", ["-p", "biome", "--run", command], {
    stdio: "inherit",
  });
  process.exit(result.status ?? 1);
}

const binDir = join("node_modules", ".bin");
const binCandidates = ["biome", "biome.cmd", "biome.exe"];
const bin = binCandidates.map((name) => join(binDir, name)).find(existsSync);

if (!bin) {
  exitWithError(
    `Biome is not installed (expected ${join(binDir, "biome")}).\n` +
      "Run `npm install` to install the @biomejs/biome package.",
  );
}

const result = spawnSync(bin, args, { stdio: "inherit" });
process.exit(result.status ?? 1);
