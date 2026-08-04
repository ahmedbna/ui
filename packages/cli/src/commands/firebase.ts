import { runScaffold } from '../scaffold/index.js';
import {
  connectFirebase,
  type FirebaseCredentials,
  type FirebaseOptions,
} from '../scaffold/steps/firebase.js';
import { authRequested, type ScaffoldConfig } from '../scaffold/types.js';

export type InitFirebaseOptions = FirebaseOptions;

const firebaseScaffold: ScaffoldConfig<
  InitFirebaseOptions,
  FirebaseCredentials | null
> = {
  defaultProjectName: 'bna-firebase-app',
  title: (options) =>
    authRequested(options)
      ? 'Welcome to BNA — Expo + Firebase + Auth'
      : 'Welcome to BNA — Expo + Firebase',
  template: (options) =>
    authRequested(options) ? 'start-firebase-auth' : 'start-firebase',
  creatingMessage: 'Creating your BNA Firebase project...',
  // No patches. Unlike supabase/config.toml, nothing in the Firebase scaffold
  // keys off the local project name — `.firebaserc` wants the *Firebase*
  // project id, which is only known after the prompt, so the backend step
  // writes it.
  backend: {
    name: 'firebase',
    when: (ctx) => !ctx.options.skipFirebase,
    run: connectFirebase,
  },
  nextSteps: (ctx, credentials) => {
    const withAuth = authRequested(ctx.options);
    // Without credentials nothing was configured, so the manual path is the path.
    const needsManualSetup = ctx.options.skipFirebase || !credentials;

    return {
      headline: withAuth
        ? `Successfully created ${ctx.projectName} with Firebase Auth! 🎉`
        : `Successfully created ${ctx.projectName} with Firebase! 🎉`,
      steps: needsManualSetup
        ? [
            'cp .env.example .env.local   # then fill in the six values',
            'edit .firebaserc            # name your project',
            'npx firebase-tools deploy --only firestore,storage',
          ]
        : undefined,
      sections: [
        {
          title: 'Firebase commands',
          lines: [
            'npm run emulators      Run Firestore and Storage locally',
            'npm run rules:test     Execute firestore.rules and storage.rules',
            'npm run deploy:rules   Push the rules to your project',
            'npm run deploy         Rules and indexes together',
          ],
        },
      ],
      notes: [
        {
          // Nothing else in the flow says this, and the symptom — every screen
          // empty, or a console URL in a toast — does not point at the cause.
          title: 'Your queries need the rules and indexes deployed:',
          lines: [
            'npx firebase-tools deploy --only firestore,storage',
            '',
            'Until then reads fail with permission-denied or a missing index.',
          ],
        },
        ...(withAuth
          ? [
              {
                title: 'Then enable the sign-in methods you want:',
                lines: [
                  'Authentication → Sign-in method → Email/Password',
                  '',
                  'Google and Apple need a development build and OAuth client',
                  'IDs — see .env.example. Their buttons stay hidden until you',
                  'set them, so the app runs fine without.',
                  '',
                  'https://ui.ahmedbna.com/docs/installation/firebase-auth',
                ],
              },
            ]
          : [
              {
                title: 'One thing to read before you ship:',
                lines: [
                  'firestore.rules is open — anyone with the app can read and',
                  'write every task. That is deliberate for a demo.',
                  '',
                  'https://ui.ahmedbna.com/docs/firebase/rules',
                ],
              },
            ]),
      ],
      signOff: 'Happy coding with Firebase! 🚀',
    };
  },
};

export function initFirebaseCommand(
  projectName?: string,
  options: InitFirebaseOptions = {}
) {
  return runScaffold(firebaseScaffold, projectName, options);
}
