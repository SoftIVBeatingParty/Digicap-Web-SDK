import type { MuseumId } from '@/schema/museum.js'
import {
    EventSchema,
    EventListSchema,
    type Event,
    type EventId,
    type EventList,
} from '@/schema/event.js'
import {
    ArticleListSchema,
    ArticleIdListSchema,
    type Article,
    type ArticleId,
    type ArticleList,
    type ArticleIdList,
} from '@/schema/article.js'

export class EventArticleRepository {
    
    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, eventId: EventId) {
        this.baseURL = `${baseURL}/museums/${museumId}/events/${eventId}/articles`
    }

    async get(): Promise<ArticleList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleListSchema.parse(await response.json())
    }

    async put(articleIds: ArticleIdList): Promise<ArticleList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(articleIds),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleListSchema.parse(await response.json())
    }
}