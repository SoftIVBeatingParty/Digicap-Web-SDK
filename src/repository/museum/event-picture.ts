import type { MuseumId } from '@/schema/museum.js'
import type { EventId } from '@/schema/event.js'
import {
    PictureListSchema,
    PictureSchema,
    type Picture,
    type PictureId,
    type PictureList,
} from '@/schema/picture.js'

export class EventPictureRepository {
    readonly baseURL: string
    constructor(baseURL: string, museumId: MuseumId, eventId: EventId) {
        this.baseURL = `${baseURL}/museums/${museumId}/events/${eventId}/picture`
    }

    async get(): Promise<Picture> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return PictureSchema.parse(await response.json())
    }

    async put(pictureId: PictureId): Promise<Picture> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(pictureId),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return PictureSchema.parse(await response.json())
    }
}