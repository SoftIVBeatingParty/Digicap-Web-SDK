import { z } from "zod"
import { PictureIdSchema } from "./picture.js"

/** Type for a guide id (Nominal Type) */
export type GuideId = string & { readonly __brand: unique symbol }

/** Zod Schema for a guide id (Branded UUID) */
export const GuideIdSchema = z.uuid().transform(id => id as GuideId)

/** Zod Schema for an array of guide ids */
export const GuideIdListSchema = z.array(GuideIdSchema)

/** Type for an array of guide ids */
export type GuideIdList = z.infer<typeof GuideIdListSchema>

/** Zod Schema for a guide */
export const GuideSchema = z.object({
    id: GuideIdSchema,
    name: z.string().min(1).max(255),
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
    pictureId: z.lazy(() => PictureIdSchema).nullable(),
}).strip()

/** Type for a guide, as responded by the API */
export type Guide = z.infer<typeof GuideSchema>

/** Zod Schema for creating a guide, using the POST method */
export const CreateGuideSchema = GuideSchema.pick({
    name: true
}).strip()

/** Type for creating a guide */
export type CreateGuide = z.infer<typeof CreateGuideSchema>

/** Zod Schema for updating a guide, using the PATCH method  */
export const UpdateGuideSchema = CreateGuideSchema

/** Type for updating a guide */
export type UpdateGuide = z.infer<typeof UpdateGuideSchema>

/** Zod Schema for an array of guides */
export const GuideListSchema = z.array(GuideSchema)

/** Type for a list of guides, as responded by the API */
export type GuideList = z.infer<typeof GuideListSchema>