#!/usr/bin/env node

require("dotenv").config();

let server,
  isDev = process.argv[2] === "dev",
  { spawn } = require("child_process"),
  onRebuild = () => {
    if (isDev) {
      console.log("❤");
      if (server) server.kill("SIGINT");
      server = spawn("node", ["dist/index.js"], { stdio: "inherit" });
    }
  };

require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist",
    platform: "node",
    sourcemap: true,
    minify: process.env.NODE_ENV !== "production",
    watch: isDev && { onRebuild },
    target: "node14",
    define: {
      __DEV__: isDev,
    },
  })
  .finally(onRebuild);
