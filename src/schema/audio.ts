import { z } from "zod"

/** Type for an audio id (Nominal Type) */
export type AudioId = string & { readonly __brand: unique symbol }

/** Zod Schema for an audio id (Branded UUID) */
export const AudioIdSchema = z.uuid().transform(id => id as AudioId)

/** Zod Schema for an audio */
export const AudioSchema = z.object({
    id: AudioIdSchema,
    name: z.string().min(1).max(255),
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
}).strip()

/** Type for an audio, as responded by the API */
export type Audio = z.infer<typeof AudioSchema>

/** Zod Schema for creating an audio, using the POST method */
export const AudioListSchema = z.array(AudioSchema)

/** Type for an audio, as responded by the API */
export type AudioList = z.infer<typeof AudioListSchema>