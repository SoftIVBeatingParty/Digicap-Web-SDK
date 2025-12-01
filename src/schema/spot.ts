import { z } from "zod";

/** Type for a spot ID (Nominal Type) */
export type SpotId = string & { readonly __brand: unique symbol }

/** Zod Schema for a spot ID (Branded UUID) */
export const SpotIdSchema = z.uuid().transform(id => id as SpotId)

/** Zod Schema for creating a spot, using the POST method */
export const CreateSpotSchema = z.object({
    name: z.string().min(1).max(255),
}).strip()

/** Type for creating a spot */
export type CreateSpot = z.infer<typeof CreateSpotSchema>

/** Zod Schema for updating a spot, using the PATCH method */
export const UpdateSpotSchema = CreateSpotSchema.partial().strip()

/** Type for updating a spot */
export type UpdateSpot = z.infer<typeof UpdateSpotSchema>

/** Zod Schema for a spot */
export const SpotSchema = CreateSpotSchema.extend({
    id: SpotIdSchema,
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
}).strip()

/** Type for a spot, as responded by the API */
export type Spot = z.infer<typeof SpotSchema>

/** Zod Schema for an array of spots */
export const SpotListSchema = z.array(SpotSchema)

/** Type for a list of spots, as responded by the API */
export type SpotList = z.infer<typeof SpotListSchema>