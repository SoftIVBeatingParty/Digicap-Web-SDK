import { z } from "zod";

/** Type for an area id (Nominal Type) */
export type AreaId = string & { readonly __brand: unique symbol }

/** Zod Schema for an area id (Branded UUID) */
export const AreaIdSchema = z.uuid().transform(id => id as AreaId)

/** Zod Schema for an array of area ids */
export const AreaIdListSchema = z.array(AreaIdSchema)

/** Type for an array of area ids */
export type AreaIdList = z.infer<typeof AreaIdListSchema>

/** Zod Schema for an area */
export const AreaSchema = z.object({
    id: AreaIdSchema,
    name: z.string().min(1).max(255),
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
}).strip()

/** Type for an area, as responded by the API */
export type Area = z.infer<typeof AreaSchema>

/** Zod Schema for creating an area, using the POST method */
export const CreateAreaSchema = AreaSchema.pick({
    name: true,
}).strip()

/** Type for creating an area */
export type CreateArea = z.infer<typeof CreateAreaSchema>

/** Zod Schema for updating an area, using the PATCH method  */
export const UpdateAreaSchema = CreateAreaSchema

/** Type for updating an area */
export type UpdateArea = z.infer<typeof UpdateAreaSchema>

/** Zod Schema for an area, as responded by the API */
export const AreaListSchema = z.array(AreaSchema)

/** Type for an area, as responded by the API */
export type AreaList = z.infer<typeof AreaListSchema>