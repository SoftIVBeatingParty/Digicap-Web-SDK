import { MuseumId } from '@/schema/museum.js'
import { GuideId } from '@digicap/web-sdk'
import {
    PictureSchema,
    type Picture,
    type PictureId,
} from '@/schema/picture.js'

export class GuidePictureRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, guideId: GuideId) {
        this.baseURL = `${baseURL}/museums/${museumId}/guides/${guideId}/picture`
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