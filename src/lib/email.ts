import { Resend } from "resend";

let resend: Resend;

function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Shri Mata Vaishno Devi <onboarding@resend.dev>";

export async function sendVerificationEmail({
  email,
  name,
  url,
}: {
  email: string;
  name: string;
  url: string;
}) {
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 50%, #e8a838 100%); padding: 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">🏔️ Shri Mata Vaishno Devi</h1>
                      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">Your Gateway to Kashmir's Untouched Beauty</p>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #1e3a5f; margin: 0 0 16px 0; font-size: 24px;">Verify Your Email</h2>
                      <p style="color: #64748b; line-height: 1.6; margin: 0 0 24px 0;">
                        Hi ${name || "there"},<br><br>
                        Welcome to Shri Mata Vaishno Devi! Please verify your email address to start exploring Kashmir's incredible tour packages and adventures.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 0 0 24px 0;">
                            <a href="${url}" style="display: inline-block; background-color: #e8a838; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: bold; font-size: 16px;">Verify Email Address</a>
                          </td>
                        </tr>
                      </table>
                      <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
                        If the button doesn't work, copy and paste this link into your browser:<br>
                        <a href="${url}" style="color: #1e3a5f;">${url}</a>
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                      <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                        Shri Mata Vaishno Devi | Katra, Vaishno Devi, Jammu & Kashmir<br>
                        License: JKAT00003494 | Phone: +91 6006465184
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail({
  email,
  name,
  url,
}: {
  email: string;
  name: string;
  url: string;
}) {
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 50%, #e8a838 100%); padding: 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">🏔️ Shri Mata Vaishno Devi</h1>
                      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">Password Reset Request</p>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #1e3a5f; margin: 0 0 16px 0; font-size: 24px;">Reset Your Password</h2>
                      <p style="color: #64748b; line-height: 1.6; margin: 0 0 24px 0;">
                        Hi ${name || "there"},<br><br>
                        We received a request to reset the password for your Shri Mata Vaishno Devi account. Click the button below to set a new password.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 0 0 24px 0;">
                            <a href="${url}" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: bold; font-size: 16px;">Reset Password</a>
                          </td>
                        </tr>
                      </table>
                      <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
                        If the button doesn't work, copy and paste this link into your browser:<br>
                        <a href="${url}" style="color: #1e3a5f;">${url}</a>
                      </p>
                      <p style="color: #ef4444; font-size: 13px; line-height: 1.5; margin: 24px 0 0 0;">
                        ⚠️ If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                      <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                        Shri Mata Vaishno Devi | Katra, Vaishno Devi, Jammu & Kashmir<br>
                        License: JKAT00003494 | Phone: +91 6006465184
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return { success: false, error };
  }
}
