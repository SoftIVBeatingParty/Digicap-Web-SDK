import type { MuseumId } from '@/schema/museum.js'
import {
    ArticleListSchema,
    ArticleSchema,
    type Article,
    type ArticleId,
    type ArticleList,
    type CreateArticle,
    type UpdateArticle,
} from '@/schema/article.js'
import {
    EventListSchema,
    EventSchema,
    type Event,
    type EventId,
    type EventList,
} from '@/schema/event.js'

export class ArticleEventRepository {
    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/events`
    }

    async get(): Promise<EventList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return EventListSchema.parse(await response.json())
    }

    async update(eventIds: EventId[]): Promise<EventList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(eventIds),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return EventListSchema.parse(await response.json())
    }
}
