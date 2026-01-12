import type { MuseumId } from "@/schema/museum.js";
import {
  EventListSchema,
  EventSchema,
  type Event,
  type EventId,
  type EventList,
  type CreateEvent,
  type UpdateEvent,
} from "@/schema/event.js";

export class EventRepository {
  readonly baseURL: string;

  constructor(baseURL: string, museumId: MuseumId) {
    this.baseURL = `${baseURL}/museums/${museumId}/events`;
  }

  async collect(): Promise<EventList> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    return EventListSchema.parse(await response.json());
  }

  async get(id: EventId) {
    const url = `${this.baseURL}/${id}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return EventSchema.parse(await response.json());
  }

  async create(event: CreateEvent): Promise<Event> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return EventSchema.parse(await response.json());
  }

  async update(id: EventId, event: UpdateEvent): Promise<Event> {
    const url = `${this.baseURL}/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return EventSchema.parse(await response.json());
  }

  async delete(id: EventId): Promise<void> {
    const url = `${this.baseURL}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
}
