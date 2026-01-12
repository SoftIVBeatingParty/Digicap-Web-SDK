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

    async getMuseums(): Promise<MuseumList> {
        const url = `${this.baseURL}/users/me/museums`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return MuseumListSchema.parse(await response.json())
    }

    async delete(userId: UserId): Promise<void> {
        const url = `${this.baseURL}/users/${userId}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({}),
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }

    //　isAdminの変更が必要なら変更
    async getRole(userId: UserId): Promise<{ isAdmin: boolean }> {
        const url = `${this.baseURL}/users/${userId}/role`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        const data = await response.json()
        return { isAdmin: data === "admin" }
    }
}