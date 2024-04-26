import { z } from "zod";

const SignInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
