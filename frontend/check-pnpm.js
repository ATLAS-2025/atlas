#!/usr/bin/env node

if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.error("\n🚨 Please use pnpm instead of npm/yarn!\n");
  process.exit(1);
}
