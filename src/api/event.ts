import type { MuseumId } from "@/schema/museum.js"
import { http } from "@/lib/http/axios.js"
import {
    EventListSchema,
    EventSchema,
    CreateEventSchema,
    UpdateEventSchema,
    type Event,
    type EventId,
    type EventList,
    type CreateEvent,
    type UpdateEvent
} from "@/schema/event.js"

export async function getEventList(museumId: MuseumId): Promise<EventList> {
    const response = await http.get(`/museums/${museumId}/events`)
    return EventListSchema.parse(response.data)
}

export async function getEvent(museumId: MuseumId, id: EventId) {
    const response = await http.get(`/museums/${museumId}/events/${id}`)
    return EventSchema.parse(response.data)
}

export async function createEvent(museumId: MuseumId, event: CreateEvent): Promise<Event> {
    const body = CreateEventSchema.parse(event)
    const response = await http.post(`/museums/${museumId}/events`, body)
    return EventSchema.parse(response.data)
}

export async function updateEvent(museumId: MuseumId, id: EventId, event: UpdateEvent): Promise<Event> {
    const body = UpdateEventSchema.parse(event)
    const response = await http.patch(`/museums/${museumId}/events/${id}`, body)
    return EventSchema.parse(response.data)
}

export async function deleteEvent(museumId: MuseumId, id: EventId): Promise<void> {
    await http.delete(`/museums/${museumId}/events/${id}`)
}