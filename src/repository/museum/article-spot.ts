import type { MuseumId } from '@/schema/museum.js'
import type { ArticleId } from '@/schema/article.js'
import {
    SpotListSchema,
    type Spot,
    type SpotList,
} from '@/schema/spot.js'

export class ArticleSpotRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/spot`
    }

    async get(): Promise<SpotList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotListSchema.parse(await response.json())
    }
}