import { z } from "zod";

/** Zod Schema for user credentials, used for sign-in and sign-up requests. */
export const CredentialsSchema = z
  .object({
    email: z.email().transform((e) => e.toLowerCase()),
    password: z.string().min(8).max(32),
  })
  .strip();

/** Type for user credentials. */
export type Credentials = z.infer<typeof CredentialsSchema>;
