import { z } from "zod"

/** Zod Schema for a basic user object, typically returned by the API after authentication. */
export const UserSchema = z.object({
    email: z.email(),
}).strict()

/** Type for a user object. */
export type User = z.infer<typeof UserSchema>

/** Zod Schema for user credentials, used for sign-in and sign-up requests. */
export const UserCredentialsSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(32)
}).strict()

/** Type for user credentials. */
export type UserCredentials = z.infer<typeof UserCredentialsSchema>