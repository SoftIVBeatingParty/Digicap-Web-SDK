import type { MuseumId } from '@/schema/museum.js'
import type { ArticleId } from '@/schema/article.js'
import {
    SpotSchema,
    type Spot,
} from '@/schema/spot.js'

export class ArticleSpotRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/spot`
    }

    async find(): Promise<Spot | undefined> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (response.status === 404) {
            return undefined
        }
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotSchema.parse(await response.json())
    }
}