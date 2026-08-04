import { describe, expect, it } from 'vitest';
import {
  deriveFirebaseDefaults,
  envFileFor,
  isValidProjectId,
  patchFirebaseRcText,
  type FirebaseCredentials,
} from '../src/scaffold/steps/firebase.js';

const credentials = (over: Partial<FirebaseCredentials> = {}) => ({
  projectId: 'my-app-1234',
  apiKey: 'AIzaSyTest',
  authDomain: 'my-app-1234.firebaseapp.com',
  storageBucket: 'my-app-1234.firebasestorage.app',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:abc',
  ...over,
});

describe('deriveFirebaseDefaults', () => {
  it('derives both hostnames from the project id', () => {
    expect(deriveFirebaseDefaults('my-app-1234')).toEqual({
      authDomain: 'my-app-1234.firebaseapp.com',
      storageBucket: 'my-app-1234.firebasestorage.app',
    });
  });

  it('trims, so a pasted value with whitespace still works', () => {
    expect(deriveFirebaseDefaults('  my-app  ').authDomain).toBe(
      'my-app.firebaseapp.com'
    );
  });
});

describe('isValidProjectId', () => {
  it('accepts what Google actually issues', () => {
    expect(isValidProjectId('my-app-1234')).toBe(true);
    expect(isValidProjectId('bna-ui-demo')).toBe(true);
  });

  it('rejects a pasted URL or console path', () => {
    // The most likely wrong paste: the user copies from the address bar.
    expect(isValidProjectId('https://my-app.firebaseapp.com')).toBe(false);
    expect(isValidProjectId('console.firebase.google.com/project/my-app')).toBe(
      false
    );
  });

  it('rejects uppercase, spaces and too-short ids', () => {
    expect(isValidProjectId('My-App')).toBe(false);
    expect(isValidProjectId('my app')).toBe(false);
    expect(isValidProjectId('abc')).toBe(false);
  });
});

describe('envFileFor', () => {
  it('writes all six variables', () => {
    const env = envFileFor(credentials());

    for (const key of [
      'EXPO_PUBLIC_FIREBASE_API_KEY',
      'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
      'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'EXPO_PUBLIC_FIREBASE_APP_ID',
    ]) {
      expect(env).toContain(`${key}=`);
    }
    expect(env.endsWith('\n')).toBe(true);
  });

  it('preserves an .appspot.com bucket rather than normalising it', () => {
    // Projects created before October 2024 use the old suffix. Rewriting it to
    // the derived default would produce uploads that 404 much later.
    const env = envFileFor(
      credentials({ storageBucket: 'my-app-1234.appspot.com' })
    );

    expect(env).toContain(
      'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=my-app-1234.appspot.com'
    );
  });
});

describe('patchFirebaseRcText', () => {
  it('replaces the placeholder default project', () => {
    const before = JSON.stringify(
      { projects: { default: 'your-project-id' } },
      null,
      2
    );

    expect(JSON.parse(patchFirebaseRcText(before, 'my-app-1234'))).toEqual({
      projects: { default: 'my-app-1234' },
    });
  });

  it('keeps any other aliases the file already has', () => {
    const before = JSON.stringify(
      { projects: { default: 'your-project-id', staging: 'my-app-staging' } },
      null,
      2
    );

    expect(JSON.parse(patchFirebaseRcText(before, 'prod'))).toEqual({
      projects: { default: 'prod', staging: 'my-app-staging' },
    });
  });

  it('rewrites an unparseable file rather than throwing', () => {
    // Hand-edited into something invalid. The file has one job, and failing the
    // whole scaffold over it would be worse than replacing it.
    expect(JSON.parse(patchFirebaseRcText('{ not json', 'my-app'))).toEqual({
      projects: { default: 'my-app' },
    });
  });
});
