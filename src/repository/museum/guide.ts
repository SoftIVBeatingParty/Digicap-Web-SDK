import type { MuseumId } from "@/schema/museum.js"
import {
    GuideListSchema,
    GuideSchema,
    type Guide,
    type GuideId,
    type GuideList,
    type CreateGuide,
    type UpdateGuide
} from "@/schema/guide.js"

export class GuideRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId) {
        this.baseURL = `${baseURL}/museums/${museumId}/guides`
    }

    async collect(): Promise<GuideList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return GuideListSchema.parse(await response.json())
    }

    async get(id: GuideId): Promise<Guide> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return GuideSchema.parse(await response.json())
    }

    async create(guide: CreateGuide): Promise<Guide> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(guide),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return GuideSchema.parse(await response.json())
    }

    async update(id: GuideId, guide: UpdateGuide): Promise<Guide> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(guide),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return GuideSchema.parse(await response.json())
    }

    async delete(id: GuideId): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
    }
}