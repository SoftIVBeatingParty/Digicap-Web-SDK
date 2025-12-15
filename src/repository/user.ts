import type { FetchLike } from "@/index.js"
import {
    UserSchema,
    type User,
    type UserId
} from "@/schema/user.js"
import {
    MuseumListSchema,
    type MuseumList,
} from "@/schema/museum.js"

export class UserRepository {

    constructor(readonly baseURL: string, readonly fetch: FetchLike = fetch) { }

    async get(userId: UserId): Promise<User> {
        const url = `${this.baseURL}/users/${userId}`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return UserSchema.parse(await response.json())
    }

    async getMe(): Promise<User> {
        const url = `${this.baseURL}/users/me`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return UserSchema.parse(await response.json())
    }
    
        async getMuseums(): Promise<MuseumList> {
            const url = `/users/me/museums`
            const response = await this.fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            if (!response.ok) { throw new Error(response.statusText) }
            return MuseumListSchema.parse(await response.json())
        }
}