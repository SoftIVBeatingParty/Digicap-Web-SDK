import type { HttpClient } from "../core/http.js"
import type { MuseumId } from "../schema/museum.js"
import {
    SpotListSchema,
    SpotSchema,
    CreateSpotSchema,
    UpdateSpotSchema,
    type Spot,
    type SpotId,
    type SpotList,
    type CreateSpot,
    type UpdateSpot
} from "../schema/spot.js"

/**
 * Returns an async function that fetches all spots for a specific museum from the API.
 * @param museumId - The branded ID of the museum whose spots are to be fetched.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a validated SpotList.
 */
export function getSpotList(museumId: MuseumId) {
    return async (client: HttpClient): Promise<SpotList> => {
        return SpotListSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/spots`
        }))
    }
}

/**
 * Returns an async function that fetches a single spot by its ID within a specific museum.
 * @param museumId - The branded ID of the museum the spot belongs to.
 * @param id - The branded ID of the spot.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a validated Spot.
 */
export function getSpot(museumId: MuseumId, id: SpotId) {
    return async (client: HttpClient): Promise<Spot> => {
        return SpotSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/spots/${id}`
        }))
    }
}

/**
 * Returns an async function that creates a new spot within a specific museum.
 * @param museumId - The branded ID of the museum where the spot will be created.
 * @param spot - The spot data to be created (must pass CreateSpotSchema validation).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the validated created Spot.
 */
export function createSpot(museumId: MuseumId, spot: CreateSpot) {
    return async (client: HttpClient): Promise<Spot> => {
        return SpotSchema.parse(await client.fetch({
            method: 'POST',
            url: `/museums/${museumId}/spots`,
            body: CreateSpotSchema.parse(spot)
        }))
    }
}

/**
 * Returns an async function that updates an existing spot by its ID within a specific museum.
 * @param museumId - The branded ID of the museum the spot belongs to.
 * @param id - The branded ID of the spot to update.
 * @param spot - The partial spot data (must pass UpdateSpotSchema validation).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the validated updated Spot.
 */
export function updateSpot(museumId: MuseumId, id: SpotId, spot: UpdateSpot) {
    return async (client: HttpClient): Promise<Spot> => {
        return SpotSchema.parse(await client.fetch({
            method: 'PATCH',
            url: `/museums/${museumId}/spots/${id}`,
            body: UpdateSpotSchema.parse(spot)
        }))
    }
}

/**
 * Returns an async function that deletes a spot by its ID within a specific museum.
 * @param museumId - The branded ID of the museum the spot belongs to.
 * @param id - The branded ID of the spot to delete.
 * @returns An async function that takes an HttpClient and returns a Promise resolving when the spot is successfully deleted (returns void).
 */
export function deleteSpot(museumId: MuseumId, id: SpotId) {
    return async (client: HttpClient): Promise<void> => {
        await client.fetch({
            method: 'DELETE',
            url: `/museums/${museumId}/spots/${id}`
        })
    }
}