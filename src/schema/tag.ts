import { z } from "zod";

/** Type for a tag id (Nominal Type) */
export type TagId = string & { readonly __brand: unique symbol };

/** Zod Schema for a tag id (Branded UUID) */
export const TagIdSchema = z.uuid().transform((id) => id as TagId);

/** Zod Schema for an array of tag ids */
export const TagIdListSchema = z.array(TagIdSchema);

/** Type for an array of tag ids */
export type TagIdList = z.infer<typeof TagIdListSchema>;

/** Zod Schema for a tag as returned by the API */
export const TagSchema = z
  .object({
    id: TagIdSchema,
    name: z.string().min(1).max(255),
    color: z.string().min(1).max(255),
    createdAt: z.union([
      z.date(),
      z.iso.datetime().transform((s) => new Date(s)),
    ]),
    updatedAt: z.union([
      z.date(),
      z.iso.datetime().transform((s) => new Date(s)),
    ]),
  })
  .strip();

/** Type for a tag, as responded by the API */
export type Tag = z.infer<typeof TagSchema>;

/** Zod Schema for creating a tag, using the POST method */
export const CreateTagSchema = TagSchema.pick({
  name: true,
  color: true,
}).strip();

/** Type for creating a tag (Request body for POST /tags) */
export type CreateTag = z.infer<typeof CreateTagSchema>;

/** Zod Schema for updating a tag, using the PATCH method. Allows partial fields and strips unrecognized keys. */
export const UpdateTagSchema = CreateTagSchema;

/** Type for updating a tag (Request body for PATCH /tags/:id) */
export type UpdateTag = z.infer<typeof UpdateTagSchema>;

/** Zod Schema for an array of tags */
export const TagListSchema = z.array(TagSchema);

/** Type for a list of tags, as responded by the API */
export type TagList = z.infer<typeof TagListSchema>;
