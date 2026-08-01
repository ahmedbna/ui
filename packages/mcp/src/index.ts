import { mcpCommand } from './server.js';

await mcpCommand({ registry: process.env.BNA_UI_REGISTRY });
