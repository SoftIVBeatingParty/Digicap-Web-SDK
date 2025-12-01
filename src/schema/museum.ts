import { z } from "zod";

/** Type for a museum id (Nominal Type) */
export type MuseumId = string & { readonly __brand: unique symbol }

/** Zod Schema for a museum id (Branded UUID) */
export const MuseumIdSchema = z.uuid().transform(id => id as MuseumId)

/** Zod Schema for creating a museum, using the POST method */
export const CreateMuseumSchema = z.object({
    name: z.string().min(1).max(255),
}).strict()

/** Type for creating a museum */
export type CreateMuseum = z.infer<typeof CreateMuseumSchema>

/** Zod Schema for updating a museum, using the PATCH method  */
export const UpdateMuseumSchema = CreateMuseumSchema.partial().strip()

/** Type for updating a museum */
export type UpdateMuseum = z.infer<typeof UpdateMuseumSchema>

/** Zod Schema for a museum */
export const MuseumSchema = CreateMuseumSchema.extend({
    id: MuseumIdSchema,
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
}).strict()

/** Type for a museum, as responded by the API */
export type Museum = z.infer<typeof MuseumSchema>

/** Zod Schema for a museum list, as responded by the API */
export const MuseumListSchema = z.array(MuseumSchema)

/** Type for a museum list, as responded by the API */
export type MuseumList = z.infer<typeof MuseumListSchema>