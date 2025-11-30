import { z } from "zod";

/** Zod Schema for a museum id (Branded UUID) */
export const MuseumIdSchema = z.uuid().transform((id) => {
    return id as typeof id & { readonly __brand: "MuseumId" }
})

/** Type for a museum id (Nominal Type) */
export type MuseumId = z.infer<typeof MuseumIdSchema>

/** Zod Schema for creating a museum, using the POST method */
export const CreateMuseumSchema = z.object({
    name: z.string().min(1).max(255),
}).strict()

/** Type for creating a museum */
export type CreateMuseum = z.infer<typeof CreateMuseumSchema>

/** Zod Schema for updating a museum, using the PATCH method  */
export const UpdateMuseumSchema = CreateMuseumSchema.partial()

/** Type for updating a museum */
export type UpdateMuseum = z.infer<typeof UpdateMuseumSchema>

/** Zod Schema for a museum */
export const MuseumSchema = CreateMuseumSchema.extend({
    id: MuseumIdSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
}).strict()

/** Type for a museum, as responded by the API */
export type Museum = z.infer<typeof MuseumSchema>

/** Zod Schema for a museum list, as responded by the API */
export const MuseumListSchema = z.array(MuseumSchema)

/** Type for a museum list, as responded by the API */
export type MuseumList = z.infer<typeof MuseumListSchema>