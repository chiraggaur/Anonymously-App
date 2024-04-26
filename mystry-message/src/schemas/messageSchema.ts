import { z } from "zod";

export const MessageSchema = z.object({
  acceptMessages: z
    .string()
    .min(10, "Message must be 10 character ")
    .max(300, "Keep it short message cannot be more than 300 characters "),
});
