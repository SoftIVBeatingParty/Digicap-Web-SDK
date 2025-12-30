import { z } from "zod"

/** Type for a user id (Nominal Type) */
export type UserId = string & { readonly __brand: unique symbol }

/** Zod Schema for a user id (Cognito Sub format) */
export const UserIdSchema = z
  .string()
  .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "Invalid Cognito Sub format")
  .transform(id => id as UserId)

/** Zod Schema for an array of user ids */
export const UserIdListSchema = z.array(UserIdSchema)

/** Type for an array of user ids */
export type UserIdList = z.infer<typeof UserIdListSchema>

/** Zod Schema for a list of users. */
export const UserSchema = z.object({
    id: UserIdSchema,
    email: z.email(),
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
}).strip()

/** Type for a user. */
export type User = z.infer<typeof UserSchema>

/** Zod Schema for a list of users. */
export const UserListSchema = z.array(UserSchema)

/** Type for a list of users. */
export type UserList = z.infer<typeof UserListSchema>