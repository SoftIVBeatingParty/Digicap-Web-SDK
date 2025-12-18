import type { MuseumId } from '@/schema/museum.js'
import type { AreaId } from '@/schema/area.js'
import { SpotListSchema, type Spot } from '@/schema/spot.js'

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
            body: JSON.stringify({}),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return SpotListSchema.parse(await response.json())
    }
}