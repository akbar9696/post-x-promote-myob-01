// Entry program for post-x-promote-make-your-own-bounty-01 (Node 22,
// standard library only). The entry is the X post itself; this program
// only hands its address to the grader: it copies POST.json from the
// repository root into /output/POST.json, where the house reads it.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

await mkdir(outputDir, { recursive: true });
const sourcePath = join(botDir, "POST.json");
const parsed = JSON.parse(await readFile(sourcePath, "utf8"));
if (typeof parsed.url !== "string" || !parsed.url.startsWith("https://")) {
  throw new Error(`POST.json has no https url: ${sourcePath}`);
}
await copyFile(sourcePath, join(outputDir, "POST.json"));
console.log("POST.json copied to", join(outputDir, "POST.json"), "url:", parsed.url);
