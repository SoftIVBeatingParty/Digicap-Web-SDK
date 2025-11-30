import { z } from "zod";

/** Zod Schema for a spot ID (Branded UUID) */
export const SpotIdSchema = z.uuid().transform((id) => {
    return id as typeof id & { readonly __brand: "SpotId" }
})

/** Type for a spot ID (Nominal Type) */
export type SpotId = z.infer<typeof SpotIdSchema>

/** Zod Schema for creating a spot, using the POST method */
export const CreateSpotSchema = z.object({
    name: z.string().min(1).max(255),
}).strip()

/** Type for creating a spot */
export type CreateSpot = z.infer<typeof CreateSpotSchema>

/** Zod Schema for updating a spot, using the PATCH method */
export const UpdateSpotSchema = CreateSpotSchema.partial()

/** Type for updating a spot */
export type UpdateSpot = z.infer<typeof UpdateSpotSchema>

/** Zod Schema for a spot */
export const SpotSchema = CreateSpotSchema.extend({
    id: SpotIdSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
}).strip()

/** Type for a spot, as responded by the API */
export type Spot = z.infer<typeof SpotSchema>

/** Zod Schema for an array of spots */
export const SpotListSchema = z.array(SpotSchema)

/** Type for a list of spots, as responded by the API */
export type SpotList = z.infer<typeof SpotListSchema>