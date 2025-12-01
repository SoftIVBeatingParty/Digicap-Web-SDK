import type { MuseumId } from '@/schema/museum.js'
import { http } from '@/lib/http/axios.js'
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
} from "../schema/area.js"

export async function getAreaList(museumId: MuseumId): Promise<AreaList> {
    const response = await http.get(`/museums/${museumId}/areas`)
    return AreaListSchema.parse(response.data)
}

export async function getArea(museumId: MuseumId, id: AreaId): Promise<Area> {
    const response = await http.get(`/museums/${museumId}/areas/${id}`)
    return AreaSchema.parse(response.data)
}

export async function createArea(museumId: MuseumId, area: CreateArea): Promise<Area> {
    const body = CreateAreaSchema.parse(area)
    const response = await http.post(`/museums/${museumId}/areas`, body)
    return AreaSchema.parse(response.data)
}

export async function updateArea(museumId: MuseumId, id: AreaId, area: UpdateArea): Promise<Area> {
    const body = UpdateAreaSchema.parse(area)
    const response = await http.patch(`/museums/${museumId}/areas/${id}`, body)
    return AreaSchema.parse(response.data)
}

export async function deleteArea(museumId: MuseumId, id: AreaId): Promise<void> {
    await http.delete(`/museums/${museumId}/areas/${id}`)
}