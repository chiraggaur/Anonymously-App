import { z } from "zod";

export const UsernameValidation = z
  .string()
  .min(2, "username should be atleast 2 characters")
  .max(20, "username cannot be more than 20 characters long")
  .regex(/^[a-zA-Z0-9_]+$/, "username must not containe special characters");

export const SignUpSchema = z.object({
  username: UsernameValidation,
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "password must be 6 characters long " }),
});
