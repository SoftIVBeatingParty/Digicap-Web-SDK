import type { HttpClient } from "../core/http.js"
import {
    UserSchema,
    UserCredentialsSchema,
    type User,
    type UserCredentials
} from "../schema/user.js"

/**
 * Returns an async function that handles user sign-up.
 * * It validates the credentials and calls the sign-up API endpoint.
 *
 * @param creds - The user's sign-up credentials (email and password).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the newly signed-up User object.
 */
export function signUp(creds: UserCredentials) {
    return async (client: HttpClient): Promise<User> => {
        return UserSchema.parse(await client.fetch({
            method: 'POST',
            url: '/auth/signup',
            body: UserCredentialsSchema.parse(creds)
        }))
    }
}

/**
 * Returns an async function that handles user sign-in (login).
 * * It validates the credentials and calls the sign-in API endpoint.
 * * @param creds - The user's sign-in credentials (email and password).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the signed-in User object.
 */
export function signIn(creds: UserCredentials) {
    return async (client: HttpClient): Promise<User> => {
        return UserSchema.parse(await client.fetch({
            method: 'POST',
            url: '/auth/signin',
            body: UserCredentialsSchema.parse(creds)
        }))
    }
}

/**
 * Returns an async function that handles user sign-out (logout).
 * * It calls the sign-out API endpoint, typically clearing session/auth data.
 *
 * @returns An async function that takes an HttpClient and returns a Promise resolving when sign-out is complete (returns void).
 */
export function signOut() {
    return async (client: HttpClient): Promise<void> => {
        await client.fetch({
            method: 'POST',
            url: '/auth/signout',
        })
    }
}