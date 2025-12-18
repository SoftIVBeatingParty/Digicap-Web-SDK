import type { MuseumId } from '@/schema/museum.js'
import type { ArticleId } from '@/schema/article.js'
import {
    EventListSchema,
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
