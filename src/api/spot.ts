import type { MuseumId } from "../schema/museum.js"
import { http } from "../lib/http/axios.js"
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

export async function getSpotList(museumId: MuseumId): Promise<SpotList> {
    const response = await http.get(`/museums/${museumId}/spots`)
    return SpotListSchema.parse(response.data)
}

export async function getSpot(museumId: MuseumId, id: SpotId): Promise<Spot> {
    const response = await http.get(`/museums/${museumId}/spots/${id}`)
    return SpotSchema.parse(response.data)
}

export async function createSpot(museumId: MuseumId, spot: CreateSpot): Promise<Spot> {
    const body = CreateSpotSchema.parse(spot)
    const response = await http.post(`/museums/${museumId}/spots`, body)
    return SpotSchema.parse(response.data)
}

export async function updateSpot(museumId: MuseumId, id: SpotId, spot: UpdateSpot): Promise<Spot> {
    const body = UpdateSpotSchema.parse(spot)
    const response = await http.patch(`/museums/${museumId}/spots/${id}`, body)
    return SpotSchema.parse(response.data)
}

export async function deleteSpot(museumId: MuseumId, id: SpotId): Promise<void> {
    await http.delete(`/museums/${museumId}/spots/${id}`)
}