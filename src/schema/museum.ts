import { z } from "zod";

/** Type for a museum id (Nominal Type) */
export type MuseumId = string & { readonly __brand: unique symbol };

/** Zod Schema for a museum id (Branded UUID) */
export const MuseumIdSchema = z.uuid().transform((id) => id as MuseumId);

/** Zod Schema for an array of museum ids */
export const MuseumIdListSchema = z.array(MuseumIdSchema);

/** Type for an array of museum ids */
export type MuseumIdList = z.infer<typeof MuseumIdListSchema>;

/** Zod Schema for a museum */
export const MuseumSchema = z
  .object({
    id: MuseumIdSchema,
    name: z.string().min(1).max(255),
    createdAt: z.union([
      z.date(),
      z.iso.datetime().transform((s) => new Date(s)),
    ]),
    updatedAt: z.union([
      z.date(),
      z.iso.datetime().transform((s) => new Date(s)),
    ]),
    startTime: z.iso.datetime().transform((s) => new Date(s)),
    endTime: z.iso.datetime().transform((s) => new Date(s)),
  })
  .strip();

/** Type for a museum, as responded by the API */
export type Museum = z.infer<typeof MuseumSchema>;

/** Zod Schema for creating a museum, using the POST method */
export const CreateMuseumSchema = MuseumSchema.pick({
  name: true,
  startTime: true,
  endTime: true,
}).strip();

/** Type for creating a museum */
export type CreateMuseum = z.infer<typeof CreateMuseumSchema>;

/** Zod Schema for updating a museum, using the PATCH method  */
export const UpdateMuseumSchema = CreateMuseumSchema;

/** Type for updating a museum */
export type UpdateMuseum = z.infer<typeof UpdateMuseumSchema>;

/** Zod Schema for a museum list, as responded by the API */
export const MuseumListSchema = z.array(MuseumSchema);

/** Type for a museum list, as responded by the API */
export type MuseumList = z.infer<typeof MuseumListSchema>;
