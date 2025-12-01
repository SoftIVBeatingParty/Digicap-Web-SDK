import type { HttpClient } from "../core/http.js"
import {
    MuseumListSchema,
    MuseumSchema,
    CreateMuseumSchema,
    UpdateMuseumSchema,
    type Museum,
    type MuseumId,
    type MuseumList,
    type CreateMuseum,
    type UpdateMuseum
} from "../schema/museum.js"

/**
 * Returns an async function that fetches a list of museums.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a validated MuseumList.
 */
export function getMuseumList() {
    return async (client: HttpClient): Promise<MuseumList> => {
        return MuseumListSchema.parse(await client.fetch({
            method: 'GET',
            url: '/museums'
        }))
    }
}

/**
 * Returns an async function that fetches a single museum by its ID.
 * @param id - The branded ID of the museum
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a Museum.
 */
export function getMuseum(id: MuseumId) {
    return async (client: HttpClient): Promise<Museum> => {
        return MuseumSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${id}`
        }))
    }
}

/**
 * Returns an async function that creates a new museum.
 * @param museum - The museum data to be created (must pass CreateMuseumSchema validation)
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the newly created Museum.
 */
export function createMuseum(museum: CreateMuseum) {
    return async (client: HttpClient): Promise<Museum> => {
        return MuseumSchema.parse(await client.fetch({
            method: 'POST',
            url: '/museums',
            body: CreateMuseumSchema.parse(museum)
        }))
    }
}

/**
 * Returns an async function that updates an existing museum by its ID with partial data.
 * @param id - The branded ID of the museum to update
 * @param museum - The partial museum data (must pass UpdateMuseumSchema validation)
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the updated Museum.
 */
export function updateMuseum(id: MuseumId, museum: UpdateMuseum) {
    return async (client: HttpClient): Promise<Museum> => {
        return MuseumSchema.parse(await client.fetch({
            method: 'PATCH',
            url: `/museums/${id}`,
            body: UpdateMuseumSchema.parse(museum)
        }))
    }
}

/**
 * Returns an async function that deletes a museum by its ID.
 * @param id - The branded ID of the museum to delete
 * @returns An async function that takes an HttpClient and returns a Promise resolving when the museum is successfully deleted (returns void).
 */
export function deleteMuseum(id: MuseumId) {
    return async (client: HttpClient): Promise<void> => {
        await client.fetch({
            method: 'DELETE',
            url: `/museums/${id}`
        })
    }
}