import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

/**
 * Returns true when running on NixOS.
 *
 * Reads /etc/os-release and checks the `ID` (and `ID_LIKE` for distro variants,
 * which may declare themselves via nixos). Falls back to false when the file is
 * missing or unreadable.
 */
export function isNixOS(): boolean {
  try {
    const content = readFileSync("/etc/os-release", "utf8");
    const id = /^ID=["']?([A-Za-z0-9_-]+)["']?$/m
      .exec(content)?.[1]
      ?.toLowerCase();
    if (id === "nixos") return true;

    const idLike = /^ID_LIKE=["']?([^"'\n]+)["']?$/m
      .exec(content)?.[1]
      ?.toLowerCase();
    if (idLike?.split(/\s+/).includes("nixos")) return true;
  } catch {
    // /etc/os-release unreadable/missing — fall through to no match
  }
  return false;
}

/**
 * Resolves a command on PATH the same way the shell does and returns its
 * absolute path (e.g. "/etc/profiles/per-user/orkun/bin/biome"), or null
 * when the command is not found.
 *
 * `node_modules/.bin` is filtered out of the PATH lookup so the result can
 * never be the project-local CLI shim — the caller wants the system-level
 * (Nix-provided) executable.
 */
export function commandPath(cmd: string): string | null {
  const filtered = (process.env["PATH"] ?? "")
    .split(":")
    .filter((entry) => entry.length > 0 && !entry.endsWith("node_modules/.bin"))
    .join(":");
  const result = spawnSync("sh", ["-c", `command -v ${cmd}`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    env: { ...process.env, PATH: filtered },
  });
  if (result.status !== 0) return null;
  const output = result.stdout.trim();
  return output.length > 0 ? output : null;
}
