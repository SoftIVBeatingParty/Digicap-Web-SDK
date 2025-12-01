import { z } from "zod";

/** Zod Schema for an area id (Branded UUID) */
export const AreaIdSchema = z.uuid().transform((id) => {
    return id as typeof id & { readonly __brand: "AreaId" }
})

/** Type for an area id (Nominal Type) */
export type AreaId = z.infer<typeof AreaIdSchema>

/** Zod Schema for creating an area, using the POST method */
export const CreateAreaSchema = z.object({
    name: z.string().min(1).max(255),
}).strict()

/** Type for creating an area */
export type CreateArea = z.infer<typeof CreateAreaSchema>

/** Zod Schema for updating an area, using the PATCH method  */
export const UpdateAreaSchema = CreateAreaSchema.partial()

/** Type for updating an area */
export type UpdateArea = z.infer<typeof UpdateAreaSchema>

/** Zod Schema for an area */
export const AreaSchema = CreateAreaSchema.extend({
    id: z.uuid(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
})

/** Type for an area, as responded by the API */
export type Area = z.infer<typeof AreaSchema>

/** Zod Schema for an area, as responded by the API */
export const AreaListSchema = z.array(AreaSchema)

/** Type for an area, as responded by the API */
export type AreaList = z.infer<typeof AreaListSchema>