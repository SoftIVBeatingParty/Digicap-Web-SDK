import type { MuseumId } from "@/schema/museum.js"
import {
    TagListSchema,
    TagSchema,
    type Tag,
    type TagId,
    type TagList,
    type CreateTag,
    type UpdateTag
} from "@/schema/tag.js"

export class TagRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId) {
        this.baseURL = `${baseURL}/museums/${museumId}/tags`
    }

    async collect(): Promise<TagList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return TagListSchema.parse(await response.json())
    }

    async get(id: TagId): Promise<Tag> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return TagSchema.parse(await response.json())
    }

    async create(tag: CreateTag): Promise<Tag> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(tag)
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return TagSchema.parse(await response.json())
    }

    async update(id: TagId, tag: UpdateTag): Promise<Tag> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(tag)
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return TagSchema.parse(await response.json())
    }

    async delete(id: TagId): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }
}