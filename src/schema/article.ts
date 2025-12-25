import { z } from "zod";

/** Zod Schema for an area id (Branded UUID) */
export type ArticleId = string & { readonly __brand: unique symbol }

/** Zod Schema for an article id (Branded UUID) */
export const ArticleIdSchema = z.uuid().transform(id => id as ArticleId)

/** Zod Schema for an array of article ids */
export const ArticleIdListSchema = z.array(ArticleIdSchema)

/** Type for an array of article ids */
export type ArticleIdList = z.infer<typeof ArticleIdListSchema>

/** Zod Schema for an article */
export const ArticleSchema = z.object({
    id: ArticleIdSchema,
    name: z.string().min(1).max(255),
    body: z.string().min(0).max(4096),
    published: z.boolean().default(false),
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
}).strip()

/** Type for an article, as responded by the API */
export type Article = z.infer<typeof ArticleSchema>

/** Zod Schema for creating an article, using the POST method */
export const CreateArticleSchema = ArticleSchema.pick({
    name: true,
    body: true,
    published: true,
}).strip()

/** Type for creating an article */
export type CreateArticle = z.infer<typeof CreateArticleSchema>

/** Zod Schema for updating an article, using the PATCH method  */
export const UpdateArticleSchema = CreateArticleSchema

/** Type for updating an article */
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>

/** Zod Schema for an article, as responded by the API */
export const ArticleListSchema = z.array(ArticleSchema)

/** Type for an article, as responded by the API */
export type ArticleList = z.infer<typeof ArticleListSchema>

/** Type for permissions related to article operations */
export type ArticlePermission = {
    canGet: boolean
    canGetList: boolean
    canCreate: boolean
    canUpdate: boolean
    canDelete: boolean
}