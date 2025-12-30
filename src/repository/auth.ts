import type { Credentials } from "@/schema/auth.js"

import {
    UserSchema,
    type User,
} from "@/schema/user.js"

export class AuthRepository {
    constructor(private baseURL: string) {}

    async signup(creds: Credentials): Promise<User> {
        const url = `${this.baseURL}/auth/signup`
        const response = await fetch(url, {
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
        const response = await fetch(url, {
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
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }

    async confirmSignup(email: string, code: string): Promise<void> {
        const res = await fetch(`${this.baseURL}/auth/confirm-signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, code }),
        })
        if (!res.ok) throw new Error(res.statusText)
    }

    async resendConfirmation(email: string): Promise<void> {
        const res = await fetch(`${this.baseURL}/auth/resend-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email }),
        })
        if (!res.ok) throw new Error(res.statusText)
    }
}