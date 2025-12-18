import type { MuseumId } from '@/schema/museum.js'
import {
    ArticleSchema,
    ArticleListSchema,
    type Article,
    type ArticleId,
    type ArticleList,
} from '@/schema/article.js'
import {
    SpotListSchema,
    SpotSchema,
    type Spot,
    type SpotId,
    type SpotList,
} from '@/schema/spot.js'

export class ArticleSpotRepository {
    readonly baseURL: string
    constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/spots`
    }
    async get(): Promise<SpotList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotListSchema.parse(await response.json())
    }
}