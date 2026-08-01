/**
 * `bna-ui mcp` — hands off to the `@bna-ui/mcp` server.
 *
 * The server itself lives in its own package because the MCP SDK pulls in
 * express, hono, ajv, cors and jose to support HTTP and SSE transports it never
 * uses: 93 packages and 24 MB, which is 63% of what `npx bna-ui add` used to
 * download. Splitting it means only people who actually run an MCP server pay
 * for it.
 *
 * This shim exists so the documented invocation keeps working:
 *
 *     claude mcp add bna-ui -- npx -y bna-ui mcp
 */
import { spawn } from 'child_process';
import { CliError } from '../utils/errors.js';

const MCP_PACKAGE = '@bna-ui/mcp';

export async function mcpCommand(
  options: { registry?: string } = {}
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    // stdio is inherited wholesale: stdout is the JSON-RPC channel between the
    // assistant and the server, and this process must not put a byte on it.
    const child = spawn('npx', ['-y', MCP_PACKAGE], {
      stdio: 'inherit',
      env: options.registry
        ? { ...process.env, BNA_UI_REGISTRY: options.registry }
        : process.env,
    });

    child.on('error', (error) => {
      reject(
        new CliError(`Could not start ${MCP_PACKAGE}.`, {
          hint: `Install it directly with: npm install -g ${MCP_PACKAGE}`,
          cause: error,
        })
      );
    });

    child.on('exit', (code, signal) => {
      // The server runs until the assistant disconnects; a clean shutdown or a
      // termination signal are both normal ways for that to end.
      if (code === 0 || code === null || signal) return resolve();
      reject(
        new CliError(`${MCP_PACKAGE} exited with code ${code}.`, {
          hint: 'Run it directly to see the failure: npx -y @bna-ui/mcp',
        })
      );
    });
  });
}
