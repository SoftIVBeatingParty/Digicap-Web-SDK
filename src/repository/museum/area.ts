import type { MuseumId } from '@/schema/museum.js'
import {
    AreaListSchema,
    AreaSchema,
    type Area,
    type AreaId,
    type AreaList,
    type CreateArea,
    type UpdateArea
} from "@/schema/area.js"

export class AreaRepository {

    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId) {
        this.baseURL = `${baseURL}/museums/${museumId}/areas`
    }

    async collect(): Promise<AreaList> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return AreaListSchema.parse(await response.json())
    }

    async get(id: AreaId): Promise<Area> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return AreaSchema.parse(await response.json())
    }

    async create(area: CreateArea): Promise<Area> {
        const url = `${this.baseURL}`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(area),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return AreaSchema.parse(await response.json())
    }

    async update(id: AreaId, area: UpdateArea): Promise<Area> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(area),
        })
        if (!response.ok) { throw new Error(response.statusText) }
        return AreaSchema.parse(await response.json())
    }

    async delete(id: AreaId): Promise<void> {
        const url = `${this.baseURL}/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
        })
        if (!response.ok) { throw new Error(response.statusText) }
    }
}