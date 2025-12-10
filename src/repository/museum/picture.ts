import type { MuseumId } from "@/schema/museum.js"
import {
    PictureListSchema,
    PictureSchema,
    type Picture,
    type PictureList,
} from "@/schema/picture.js"

export class PictureRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId) {
        this.baseURL = `${baseURL}/museums/${museumId}/pictures`
    }

    async collect(): Promise<PictureList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return PictureListSchema.parse(await response.json())
    }

    async get(id: string): Promise<Picture> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return PictureSchema.parse(await response.json())
    }

    async create(file: File): Promise<Picture> {
        const formData = new FormData()
        formData.append('file', file)
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return PictureSchema.parse(await response.json())
    }

    async delete(id: string): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }
}