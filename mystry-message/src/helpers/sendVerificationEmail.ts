import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { APIResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<APIResponse> {
  try {
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify new Account",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification Email Sent Successfully " };
  } catch (emailError) {
    console.log("Error sending verification Email", emailError);
    return { success: false, message: "Failed to send Verification Email" };
  }
}
