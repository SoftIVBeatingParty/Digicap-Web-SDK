import { z } from "zod"
import { ArticleIdListSchema, type ArticleId } from "./article.js"

/** Type for an event id (Nominal Type) */
export type EventId = string & { readonly __brand: unique symbol }

/** Zod Schema for an event id (Branded UUID) */
export const EventIdSchema = z.uuid().transform(id => id as EventId)

/** Zod Schema for an array of event ids */
export const EventIdListSchema = z.array(EventIdSchema)

/** Type for an array of event ids */
export type EventIdList = z.infer<typeof EventIdListSchema>

/** Zod Schema for an event */
export const EventSchema = z.object({
    id: EventIdSchema,
    name: z.string().min(1).max(255),
    createdAt: z.iso.datetime().transform(s => new Date(s)),
    updatedAt: z.iso.datetime().transform(s => new Date(s)),
    articleIdList: ArticleIdListSchema
}).strip()

/** Type for an event, as responded by the API */
export type Event = z.infer<typeof EventSchema>

/** Zod Schema for creating an event, using the POST method */
export const CreateEventSchema = EventSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).strip()

/** Type for creating an event */
export type CreateEvent = z.infer<typeof CreateEventSchema>

/** Zod Schema for updating an event, using the PATCH method */
export const UpdateEventSchema = CreateEventSchema

/** Type for updating an event */
export type UpdateEvent = z.infer<typeof UpdateEventSchema>

/** Zod Schema for an array of events */
export const EventListSchema = z.array(EventSchema)

/** Type for a list of events, as responded by the API */
export type EventList = z.infer<typeof EventListSchema>