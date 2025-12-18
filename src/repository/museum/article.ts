import type { MuseumId } from '@/schema/museum.js'
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

    constructor(baseURL: string, museumId: MuseumId) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles`
    }

    async collect(): Promise<ArticleList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleListSchema.parse(await response.json())
    }

    async get(id: ArticleId): Promise<Article> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return ArticleSchema.parse(await response.json())
    }

    async create(article: CreateArticle): Promise<Article> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
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
        const response = await fetch(url, {
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
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }
}