import type { Fetch } from "@/index.js"
import type { MuseumId } from "@/schema/museum.js"
import {
    SpotListSchema,
    SpotSchema,
    type Spot,
    type SpotId,
    type SpotList,
    type CreateSpot,
    type UpdateSpot,
} from "@/schema/spot.js"

export class SpotRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, readonly fetch: Fetch = fetch) {
        this.baseURL = `${baseURL}/museums/${museumId}/spots`
    }

    async collect(): Promise<SpotList> {
        const url = `${this.baseURL}`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotListSchema.parse(await response.json())
    }

    async get(id: SpotId): Promise<Spot> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotSchema.parse(await response.json())
    }

    async create(spot: CreateSpot): Promise<Spot> {
        const url = `${this.baseURL}`
        const response = await this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(spot),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotSchema.parse(await response.json())
    }

    async update(id: SpotId, spot: UpdateSpot): Promise<Spot> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(spot),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotSchema.parse(await response.json())
    }

    async delete(id: SpotId): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }
}