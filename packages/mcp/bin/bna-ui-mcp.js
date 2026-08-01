#!/usr/bin/env node
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../dist/index.js');

// stderr, never stdout: stdout is the MCP protocol channel.
if (!fs.existsSync(distPath)) {
  console.error('@bna-ui/mcp is not built. Run: pnpm build');
  process.exit(1);
}

try {
  await import(pathToFileURL(distPath).href);
} catch (error) {
  console.error('Failed to start the BNA UI MCP server:', error.message);
  process.exit(1);
}
