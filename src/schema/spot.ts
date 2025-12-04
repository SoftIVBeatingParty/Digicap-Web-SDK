import { z } from "zod";
import { ArticleIdSchema } from "@/schema/article.js";
import { AreaIdSchema } from "@/schema/area.js";

/** Type for a spot ID (Nominal Type) */
export type SpotId = string & { readonly __brand: unique symbol }

/** Zod Schema for a spot ID (Branded UUID) */
export const SpotIdSchema = z.uuid().transform(id => id as SpotId)

/** Zod Schema for an array of spot IDs */
export const SpotIdListSchema = z.array(SpotIdSchema)

/** Type for an array of spot IDs */
export type SpotIdList = z.infer<typeof SpotIdListSchema>

/** Zod Schema for a spot */
export const SpotSchema = z.object({
    id: SpotIdSchema,
    name: z.string().min(1).max(255),
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
    areaId: AreaIdSchema,
    articleId: ArticleIdSchema.nullable()
}).strip()

/** Type for a spot, as responded by the API */
export type Spot = z.infer<typeof SpotSchema>

/** Zod Schema for creating a spot, using the POST method */
export const CreateSpotSchema = SpotSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).strip()

/** Type for creating a spot */
export type CreateSpot = z.infer<typeof CreateSpotSchema>

/** Zod Schema for updating a spot, using the PATCH method */
export const UpdateSpotSchema = CreateSpotSchema

/** Type for updating a spot */
export type UpdateSpot = z.infer<typeof UpdateSpotSchema>

/** Zod Schema for an array of spots */
export const SpotListSchema = z.array(SpotSchema)

/** Type for a list of spots, as responded by the API */
export type SpotList = z.infer<typeof SpotListSchema>