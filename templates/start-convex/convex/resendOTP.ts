import { Email } from '@convex-dev/auth/providers/Email';
import { Resend as ResendAPI } from 'resend';
import { RandomReader, generateRandomString } from '@oslojs/crypto/random';

export const ResendOTP = Email({
  id: 'resend-otp',
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };

    const length = 6;
    const alphabet = '0123456789';
    return generateRandomString(random, alphabet, length);
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    console.log('Sending verification email to:', email, 'with token:', token);

    if (!provider.apiKey) {
      console.error('Missing AUTH_RESEND_KEY environment variable');
      throw new Error('Email service not configured');
    }

    const resend = new ResendAPI(provider.apiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: 'BNA UI <hi@ahmedbna.com>',
        to: [email],
        subject: `Sign in to BNA UI`,
        text: `Your verification code is: ${token}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Sign in to BNA UI</h2>
            <p>Your verification code is:</p>
            <div style="font-size: 24px; font-weight: bold; background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              ${token}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend API error:', error);
        throw new Error(`Could not send email: ${error.message}`);
      }

      console.log('Email sent successfully:', data);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new Error('Could not send verification email');
    }
  },
});
