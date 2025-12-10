import {
    UserSchema,
    type User,
    type UserId
} from "@/schema/user.js"

export class UserRepository {

    constructor(readonly baseURL: string) { }

    async get(userId: UserId): Promise<User> {
        const url = `${this.baseURL}/users/${userId}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return UserSchema.parse(await response.json())
    }

    async getMe(): Promise<User> {
        const url = `${this.baseURL}/users/me`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return UserSchema.parse(await response.json())
    }
}