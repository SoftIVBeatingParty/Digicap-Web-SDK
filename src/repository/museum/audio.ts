import type { MuseumId } from "@/schema/museum.js"
import {
    AudioListSchema,
    AudioSchema,
    type Audio,
    type AudioId,
    type AudioList,
} from "@/schema/audio.js"

export class AudioRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId) {
        this.baseURL = `${baseURL}/museums/${museumId}/audios`
    }

    async collect(): Promise<AudioList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return AudioListSchema.parse(await response.json())
    }

    async get(id: AudioId): Promise<Audio> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return AudioSchema.parse(await response.json())
    }

    async create(file: File): Promise<Audio> {
        const formData = new FormData()
        formData.append('file', file)
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return AudioSchema.parse(await response.json())
    }

    async delete(id: AudioId): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({})
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }

    embed(id: AudioId): string {
        return `${this.baseURL}/${id}/embed`
    }
}