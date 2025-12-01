import type { HttpClient } from '../core/http.js'
import type { MuseumId } from '../schema/museum.js'
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

/**
 * Returns an async function that fetches a list of articles for a given museum.
 * @param museumId The ID of the museum.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to an ArticleList.
 */
export function getArticleList(museumId: MuseumId) {
    return async (client: HttpClient): Promise<ArticleList> => {
        return ArticleListSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/articles`
        }))
    }
}

/**
 * Returns an async function that fetches a single article by its ID.
 * @param museumId The ID of the museum.
 * @param id The ID of the article.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to an Article.
 */
export function getArticle(museumId: MuseumId, id: ArticleId) {
    return async (client: HttpClient): Promise<Article> => {
        return ArticleSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/articles/${id}`
        }))
    }
}

/**
 * Returns an async function that creates a new article.
 * @param museumId The ID of the museum.
 * @param article The data for the new article.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the newly created Article.
 */
export function createArticle(museumId: MuseumId, article: CreateArticle) {
    return async (client: HttpClient) => {
        return ArticleSchema.parse(await client.fetch({
            method: 'POST',
            url: `/museums/${museumId}/articles`,
            body: CreateArticleSchema.parse(article)
        }))
    }
}

/**
 * Returns an async function that updates an existing article by its ID.
 * @param museumId The ID of the museum.
 * @param id The ID of the article to update.
 * @param article The partial data to update the article with.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the updated Article.
 */
export function updateArticle(museumId: MuseumId, id: ArticleId, article: UpdateArticle) {
    return async (client: HttpClient) => {
        return ArticleSchema.parse(await client.fetch({
            method: 'PATCH',
            url: `/museums/${museumId}/articles/${id}`,
            body: UpdateArticleSchema.parse(article)
        }))
    }
}

/**
 * Returns an async function that deletes an article by its ID.
 * @param museumId The ID of the museum.
 * @param id The ID of the article to delete.
 * @returns An async function that takes an HttpClient and returns a Promise resolving when the article is successfully deleted (returns void).
 */
export function deleteArticle(museumId: MuseumId, id: ArticleId) {
    return async (client: HttpClient) => {
        await client.fetch({
            method: 'DELETE',
            url: `/museums/${museumId}/articles/${id}`
        })
    }
}