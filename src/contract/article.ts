import { z } from "zod";

/** Zod Schema for an article id (Branded UUID) */
export const ArticleIdSchema = z.uuid().transform((id) => {
    return id as typeof id & { readonly __brand: "ArticleId" }
})

/** Type for an article id (Nominal Type) */
export type ArticleId = z.infer<typeof ArticleIdSchema>

/** Zod Schema for creating an article, using the POST method */
export const CreateArticleSchema = z.object({
    name: z.string().min(1).max(255),
    body: z.string().min(0).max(4096),
}).strip()

/** Type for creating an article */
export type CreateArticle = z.infer<typeof CreateArticleSchema>

/** Zod Schema for updating an article, using the PATCH method  */
export const UpdateArticleSchema = CreateArticleSchema.partial()

/** Type for updating an article */
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>

/** Zod Schema for an article */
export const ArticleSchema = CreateArticleSchema.extend({
    id: ArticleIdSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
}).strip()

/** Type for an article, as responded by the API */
export type Article = z.infer<typeof ArticleSchema>

/** Zod Schema for an article, as responded by the API */
export const ArticleListSchema = z.array(ArticleSchema)

/** Type for an article, as responded by the API */
export type ArticleList = z.infer<typeof ArticleListSchema>