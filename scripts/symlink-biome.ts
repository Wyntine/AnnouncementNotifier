#!/usr/bin/env -S npx tsx
/**
 * Postinstall fix-up for NixOS.
 *
 * The npm-installed `@biomejs/biome` binary is glibc-linked and NixOS refuses to
 * run it. NixOS installations typically already provide `biome` on PATH via Nix
 * (e.g. through home-manager or `nix-env -iA nixpkgs.biome`). On NixOS, we
 * replace that glibc binary with a symlink to the Nix-provided one so the
 * installed package works in place (e.g. for the npm scripts, editor tooling,
 * and `npx biome`) — the equivalent of:
 *
 *   ln -sf $(which biome) node_modules/@biomejs/cli-linux-x64/biome
 *
 * On other OSes this script is a no-op.
 */

import {
  existsSync,
  lstatSync,
  mkdirSync,
  symlinkSync,
  unlinkSync,
} from "node:fs";
import { join } from "node:path";
import { commandPath, isNixOS } from "./lib/os.ts";

const TARGET = join("node_modules", "@biomejs", "cli-linux-x64", "biome");

function exitWithError(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (!isNixOS()) {
  // Non-NixOS: nothing to do.
  process.exit(0);
}

const nixBiome = commandPath("biome");

if (!nixBiome) {
  exitWithError(
    "NixOS detected, but `biome` was not found on PATH.\n" +
      "Install Biome via Nix (e.g. `nix-env -iA nixpkgs.biome` or home-manager)\n" +
      "and re-run this script.\n" +
      "Note: `nix-env` cannot run programs — it only installs them.",
  );
}

const targetDir = join("node_modules", "@biomejs", "cli-linux-x64");

if (!existsSync(targetDir)) {
  exitWithError(
    `NixOS detected, but the npm-installed binary parent directory does not exist:\n` +
      `  ${targetDir}\n` +
      "Run `npm install` first so @biomejs/cli-linux-x64 is present.",
  );
}

// Remove any previous symlink/binary in place of the target. lstatSync covers
// dangling symlinks that existsSync() would ignore.
try {
  lstatSync(TARGET);
  unlinkSync(TARGET);
} catch (err: unknown) {
  if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
}
mkdirSync(targetDir, { recursive: true });

symlinkSync(nixBiome, TARGET);

console.log(`[symlink-biome] symlinked ${TARGET} -> ${nixBiome} (NixOS)`);
