#!/usr/bin/env node
/**
 * Bump data/pm-snapshot.json updatedAt to now (ET-friendly ISO).
 * Run locally or via CI/cron before deploy:
 *   node scripts/refresh-pm-snapshot.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(root, "data", "pm-snapshot.json");
const snapshot = JSON.parse(readFileSync(path, "utf8"));
snapshot.updatedAt = new Date().toISOString();
writeFileSync(path, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Refreshed pm-snapshot.json → updatedAt=${snapshot.updatedAt}`);
