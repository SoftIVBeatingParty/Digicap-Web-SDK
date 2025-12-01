import { z } from "zod";

/** Zod Schema for a tag id (Branded UUID) */
export const TagIdSchema = z.uuid().transform((id) => {
    return id as typeof id & { readonly __brand: "TagId" }
})

/** Type for a tag id (Nominal Type) */
export type TagId = z.infer<typeof TagIdSchema>

/** Zod Schema for creating a tag, using the POST method */
export const CreateTagSchema = z.object({
    name: z.string().min(1).max(255),
}).strip()

/** Type for creating a tag (Request body for POST /tags) */
export type CreateTag = z.infer<typeof CreateTagSchema>

/** Zod Schema for updating a tag, using the PATCH method. Allows partial fields and strips unrecognized keys. */
export const UpdateTagSchema = CreateTagSchema.partial().strip()

/** Type for updating a tag (Request body for PATCH /tags/:id) */
export type UpdateTag = z.infer<typeof UpdateTagSchema>

/** Zod Schema for a tag as returned by the API */
export const TagSchema = CreateTagSchema.extend({
    id: TagIdSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
}).strip()

/** Type for a tag, as responded by the API */
export type Tag = z.infer<typeof TagSchema>

/** Zod Schema for an array of tags */
export const TagListSchema = z.array(TagSchema)

/** Type for a list of tags, as responded by the API */
export type TagList = z.infer<typeof TagListSchema>