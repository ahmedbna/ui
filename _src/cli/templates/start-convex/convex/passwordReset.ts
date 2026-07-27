import Resend from '@auth/core/providers/resend';
import { Resend as ResendAPI } from 'resend';
import { RandomReader, generateRandomString } from '@oslojs/crypto/random';

export const ResendOTPPasswordReset = Resend({
  id: 'resend-reset',
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    console.log('Generating password reset token...');

    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };

    const length = 6;
    const alphabet = '0123456789';
    const token = generateRandomString(random, alphabet, length);

    console.log('Generated reset token:', token);
    return token;
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    console.log(
      'Sending password reset email to:',
      email,
      'with token:',
      token
    );

    if (!provider.apiKey) {
      console.error('Missing AUTH_RESEND_KEY environment variable');
      throw new Error('Email service not configured');
    }

    const resend = new ResendAPI(provider.apiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: 'BNA UI <hi@ahmedbna.com>',
        to: [email],
        subject: `Reset your BNA UI password`,
        text: `Your password reset code is: ${token}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset your BNA UI password</h2>
            <p>You requested to reset your password. Your verification code is:</p>
            <div style="font-size: 24px; font-weight: bold; background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              ${token}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend API error:', error);
        throw new Error(`Could not send reset email: ${error.message}`);
      }

      console.log('Password reset email sent successfully:', data);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Could not send password reset email');
    }
  },
});
