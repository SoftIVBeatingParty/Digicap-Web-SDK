import type { UserId } from "@/schema/user.js"
import type { Fetch } from "@/index.js"
import {
    MuseumListSchema,
    MuseumSchema,
    type Museum,
    type MuseumId,
    type MuseumList,
    type CreateMuseum,
    type UpdateMuseum,
} from "@/schema/museum.js"

export class MuseumRepository {

    constructor(readonly baseURL: string, readonly fetch: Fetch = fetch) {
        this.baseURL = `${baseURL}/museums`
     }


    async collect(): Promise<MuseumList> {
        const url = `${this.baseURL}`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return MuseumListSchema.parse(await response.json())
    }

    async get(id: MuseumId): Promise<Museum> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return MuseumSchema.parse(await response.json())
    }

    async create(museum: CreateMuseum): Promise<Museum> {
        const url = `${this.baseURL}`
        const response = await this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(museum),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return MuseumSchema.parse(await response.json())
    }

    async update(id: MuseumId, museum: UpdateMuseum): Promise<Museum> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(museum),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return MuseumSchema.parse(await response.json())
    }

    async delete(id: MuseumId): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }

    async invite(userId: UserId): Promise<void> {
        const url = `${this.baseURL}/users`
        const response = await this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userId)
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }

    async reject(userId: UserId): Promise<void> {
        const url = `${this.baseURL}/users/${userId}`
        const response = await this.fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }
}