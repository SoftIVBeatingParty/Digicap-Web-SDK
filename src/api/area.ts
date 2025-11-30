import type { HttpClient } from "../core/http.js"
import type { MuseumId } from '../contract/museum.js'
import {
    AreaListSchema,
    AreaSchema,
    CreateAreaSchema,
    UpdateAreaSchema,
    type Area,
    type AreaId,
    type AreaList,
    type CreateArea,
    type UpdateArea
} from "../contract/area.js"

/**
 * Returns an async function that fetches a list of areas for a specific museum.
 * @param museumId - The branded ID of the museum.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a validated AreaList.
 */
export function getAreaList(museumId: MuseumId) {
    return async (client: HttpClient): Promise<AreaList> => {
        return AreaListSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/areas`
        }))
    }
}

/**
 * Returns an async function that fetches a single area by its ID.
 * @param museumId - The branded ID of the museum.
 * @param id - The branded ID of the area.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a validated Area.
 */
export function getArea(museumId: MuseumId, id: AreaId) {
    return async (client: HttpClient): Promise<Area> => {
        return AreaSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/areas/${id}`
        }))
    }
}

/**
 * Returns an async function that creates a new area.
 * @param museumId - The branded ID of the museum.
 * @param area - The area data to be created (must pass CreateAreaSchema validation).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the validated created Area.
 */
export function createArea(museumId: MuseumId, area: CreateArea) {
    return async (client: HttpClient): Promise<Area> => {
        return AreaSchema.parse(await client.fetch({
            method: 'POST',
            url: `/museums/${museumId}/areas`,
            body: CreateAreaSchema.parse(area)
        }))
    }
}

/**
 * Returns an async function that updates an existing area by its ID.
 * @param museumId - The branded ID of the museum.
 * @param id - The branded ID of the area to update.
 * @param area - The partial area data (must pass UpdateAreaSchema validation).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the validated updated Area.
 */
export function updateArea(museumId: MuseumId, id: AreaId, area: UpdateArea) {
    return async (client: HttpClient): Promise<Area> => {
        return AreaSchema.parse(await client.fetch({
            method: 'PATCH',
            url: `/museums/${museumId}/areas/${id}`,
            body: UpdateAreaSchema.parse(area)
        }))
    }
}

/**
 * Returns an async function that deletes an area by its ID.
 * @param museumId - The branded ID of the museum.
 * @param id - The branded ID of the area to delete.
 * @returns An async function that takes an HttpClient and returns a Promise resolving when the area is successfully deleted (returns void).
 */
export function deleteArea(museumId: MuseumId, id: AreaId) {
    return async (client: HttpClient): Promise<void> => {
        await client.fetch({
            method: 'DELETE',
            url: `/museums/${museumId}/areas/${id}`
        })
    }
}