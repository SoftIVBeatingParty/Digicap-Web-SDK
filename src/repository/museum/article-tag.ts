import type { MuseumId } from '@/schema/museum.js'
import {
    ArticleSchema,
    ArticleListSchema,
    type Article,
    type ArticleId,
    type ArticleList,
} from '@/schema/article.js'
import {
    TagListSchema,
    TagSchema,
    type Tag,
    type TagId,
    type TagList,
} from '@/schema/tag.js'
export class ArticleTagRepository {
    readonly baseURL: string
    constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/tags`
    }

    async get(): Promise<TagList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return TagListSchema.parse(await response.json())
    }

    async put(tagIds: TagList): Promise<TagList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(tagIds),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return TagListSchema.parse(await response.json())
    }
}