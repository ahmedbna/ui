import { runScaffold } from '../scaffold/index.js';
import { patchSupabaseConfig } from '../scaffold/patches.js';
import {
  connectSupabase,
  type SupabaseCredentials,
  type SupabaseOptions,
} from '../scaffold/steps/supabase.js';
import { authRequested, type ScaffoldConfig } from '../scaffold/types.js';

export type InitSupabaseOptions = SupabaseOptions;

const supabaseScaffold: ScaffoldConfig<
  InitSupabaseOptions,
  SupabaseCredentials | null
> = {
  defaultProjectName: 'bna-supabase-app',
  title: (options) =>
    authRequested(options)
      ? 'Welcome to BNA — Expo + Supabase + Auth'
      : 'Welcome to BNA — Expo + Supabase',
  template: (options) =>
    authRequested(options) ? 'start-supabase-auth' : 'start-supabase',
  creatingMessage: 'Creating your BNA Supabase project...',
  patches: [patchSupabaseConfig],
  backend: {
    name: 'supabase',
    when: (ctx) => !ctx.options.skipSupabase,
    run: connectSupabase,
  },
  nextSteps: (ctx, credentials) => {
    const withAuth = authRequested(ctx.options);
    // Without credentials nothing was linked, so the manual path is the path.
    const needsManualSetup = ctx.options.skipSupabase || !credentials;

    return {
      headline: withAuth
        ? `Successfully created ${ctx.projectName} with Supabase Auth! 🎉`
        : `Successfully created ${ctx.projectName} with Supabase! 🎉`,
      steps: needsManualSetup
        ? [
            'cp .env.example .env.local   # then fill it in',
            'npx supabase link --project-ref <your-project-ref>',
            'npx supabase db push',
            'npm run db:types',
          ]
        : undefined,
      sections: [
        {
          title: 'Supabase commands',
          lines: [
            'npx supabase start        Run the whole stack locally (Docker)',
            'npm run db:push           Apply migrations to your project',
            'npm run db:types          Regenerate lib/database.types.ts',
            'npm run functions:deploy  Deploy the edge functions',
          ],
        },
      ],
      notes: withAuth
        ? [
            {
              // OAuth and magic links come back through a deep link, and
              // Supabase rejects any redirect not on this list. Nothing else in
              // the flow can set it — it lives in the dashboard.
              title:
                'Before OAuth and magic links work, allow-list your redirects:',
              lines: [
                'Authentication → URL Configuration → Redirect URLs',
                '  exp://localhost:8081',
                `  ${ctx.projectName}://`,
                `  ${ctx.projectName}://reset-password`,
                '',
                'https://ui.ahmedbna.com/docs/installation/supabase-auth',
              ],
            },
          ]
        : undefined,
      signOff: 'Happy coding with Supabase! 🚀',
    };
  },
};

export function initSupabaseCommand(
  projectName?: string,
  options: InitSupabaseOptions = {}
) {
  return runScaffold(supabaseScaffold, projectName, options);
}
