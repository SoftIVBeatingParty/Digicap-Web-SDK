import type { MuseumId } from '@/schema/museum.js'
import type { Fetch } from "@/index.js"
import {
    ArticleListSchema,
    ArticleSchema,
    type Article,
    type ArticleId,
    type ArticleList,
    type CreateArticle,
    type UpdateArticle
} from '@/schema/article.js'

export class ArticleRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, readonly fetch: Fetch = fetch) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles`
    }

    async collect(): Promise<ArticleList> {
        const url = `${this.baseURL}`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleListSchema.parse(await response.json())
    }

    async get(id: ArticleId): Promise<Article> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleSchema.parse(await response.json())
    }

    async create(article: CreateArticle): Promise<Article> {
        const url = `${this.baseURL}`
        const response = await this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(article),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleSchema.parse(await response.json())
    }

    async update(id: ArticleId, article: UpdateArticle): Promise<Article> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(article),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleSchema.parse(await response.json())
    }

    async delete(id: ArticleId): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await this.fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }
}