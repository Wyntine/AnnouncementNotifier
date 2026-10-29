import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  minify: false,
  dts: true,
  clean: true,
  target: "esnext",
  tsconfig: "./tsconfig.json",
});
