import { z } from "zod";

/** Type for an picture id (Nominal Type) */
export type PictureId = string & { readonly __brand: unique symbol }

/** Zod Schema for an picture id (Branded UUID) */
export const PictureIdSchema = z.uuid().transform(id => id as PictureId)

/** Zod Schema for an picture */
export const PictureSchema = z.object({
    id: PictureIdSchema,
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
}).strip()

/** Type for an picture, as responded by the API */
export type Picture = z.infer<typeof PictureSchema>

/** Zod Schema for creating an picture, using the POST method */
export const PictureListSchema = z.array(PictureSchema)

/** Type for an picture, as responded by the API */
export type PictureList = z.infer<typeof PictureListSchema>