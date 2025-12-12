import type { Credentials } from "@/schema/auth.js"
import type { FetchLike } from "@/index.js"
import {
    UserSchema,
    type User,
} from "@/schema/user.js"

export class AuthRepository {

    constructor(readonly baseURL: string, readonly fetch: FetchLike = fetch) { }

    async signup(creds: Credentials): Promise<User> {
        const url = `${this.baseURL}/auth/signup`
        const response = await this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(creds)
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return UserSchema.parse(await response.json())
    }

    async signin(creds: Credentials): Promise<User> {
        const url = `${this.baseURL}/auth/signin`
        const response = await this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(creds)
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return UserSchema.parse(await response.json())
    }

    async signout(): Promise<void> {
        const url = `${this.baseURL}/auth/signout`
        const response = await this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }

}