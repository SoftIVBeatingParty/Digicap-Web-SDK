import type { MuseumId } from '@/schema/museum.js'
import {
    SpotSchema,
    SpotListSchema,
    type Spot,
} from '@/schema/spot.js'
import {
    AreaListSchema,
    AreaSchema,
    type Area,
    type AreaId,
    type AreaList,
} from '@/schema/area.js'
export class AreaSpotRepository {
    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, areaId: AreaId) {
        this.baseURL = `${baseURL}/museums/${museumId}/areas/${areaId}/spots`
    }

    async get(): Promise<Spot[]> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotListSchema.parse(await response.json())
    }
}