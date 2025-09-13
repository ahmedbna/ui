import Apple from '@auth/core/providers/apple';
import Google from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import { convexAuth } from '@convex-dev/auth/server';
import { Password } from '@convex-dev/auth/providers/Password';
import { ResendPasswordOTP } from './resendPasswordOTP';
import { ResendOTPPasswordReset } from './passwordReset';
import { ResendOTP } from './resendOTP';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google,
    ResendOTP,
    Apple({
      profile: (appleInfo) => {
        const name = appleInfo.user
          ? `${appleInfo.user.name.firstName} ${appleInfo.user.name.lastName}`
          : undefined;
        return {
          id: appleInfo.sub,
          name: name,
          email: appleInfo.email,
        };
      },
    }),
    Password({
      profile(params, tokens) {
        return {
          name: params.name as string,
          email: params.email as string,
          gender: params.gender as string,
        };
      },
      verify: ResendPasswordOTP,
      reset: ResendOTPPasswordReset,
      validatePasswordRequirements(password) {
        console.log('Validating password requirements...');

        if (!password || password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }

        if (!/\d/.test(password)) {
          throw new Error('Password must contain at least one number');
        }

        if (!/[a-z]/.test(password)) {
          throw new Error(
            'Password must contain at least one lowercase letter'
          );
        }

        if (!/[A-Z]/.test(password)) {
          throw new Error(
            'Password must contain at least one uppercase letter'
          );
        }

        console.log('Password validation passed');
      },
    }),
    GitHub({
      profile(githubProfile, tokens) {
        return {
          githubId: githubProfile.id,
          name: githubProfile.name,
          email: githubProfile.email,
          image: githubProfile.picture as string | null | undefined,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ redirectTo }) {
      console.log('Redirect callback called with:', redirectTo);

      const siteUrl = process.env.SITE_URL!;
      const expoUrl = process.env.EXPO_URL!; // must be set in .env (bna:// in production)

      const isExpoDevUrl = redirectTo.startsWith('exp://'); // dev URLs
      const isExpoProdUrl = redirectTo.startsWith(expoUrl); // uses .env (bna:// in prod)
      const isSiteUrl = siteUrl && redirectTo.startsWith(siteUrl);

      if (isExpoDevUrl || isExpoProdUrl || isSiteUrl) {
        console.log('Redirect approved:', redirectTo);
        return redirectTo;
      }

      console.error('Invalid redirect URL:', redirectTo);
      throw new Error(`Invalid redirectTo URI ${redirectTo}`);
    },
  },
});
