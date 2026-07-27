#!/usr/bin/env node

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if TypeScript is compiled
const distPath = path.join(__dirname, '../dist/index.js');

if (!fs.existsSync(distPath)) {
  console.error('❌ CLI not built. Please run: npm run build');
  process.exit(1);
}

// Import and execute the built CLI module
try {
  // Convert file path to file URL for proper ES module import
  const fileUrl = pathToFileURL(distPath).href;
  await import(fileUrl);
} catch (error) {
  console.error('❌ Failed to start CLI:', error.message);
  process.exit(1);
}
