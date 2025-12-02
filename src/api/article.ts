import type { MuseumId } from '@/schema/museum.js'
import { http } from '@/lib/http/axios.js'
import {
    ArticleListSchema,
    ArticleSchema,
    CreateArticleSchema,
    UpdateArticleSchema,
    type Article,
    type ArticleId,
    type ArticleList,
    type CreateArticle,
    type UpdateArticle
} from '../schema/article.js'

export async function getArticleList(museumId: MuseumId): Promise<ArticleList> {
    const response = await http.get(`/museums/${museumId}/articles`)
    return ArticleListSchema.parse(response.data)
}

export async function getArticle(museumId: MuseumId, id: ArticleId): Promise<Article> {
    const response = await http.get(`/museums/${museumId}/articles/${id}`)
    return ArticleSchema.parse(response.data)
}

export async function createArticle(museumId: MuseumId, article: CreateArticle): Promise<Article> {
    const body = CreateArticleSchema.parse(article)
    const response = await http.post(`/museums/${museumId}/articles`, body)
    return ArticleSchema.parse(response.data)
}

export async function updateArticle(museumId: MuseumId, id: ArticleId, article: UpdateArticle): Promise<Article> {
    const body = UpdateArticleSchema.parse(article)
    const response = await http.patch(`/museums/${museumId}/articles/${id}`, body)
    return ArticleSchema.parse(response.data)
}

export async function deleteArticle(museumId: MuseumId, id: ArticleId): Promise<void> {
    await http.delete(`/museums/${museumId}/articles/${id}`)
}