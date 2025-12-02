import { http } from "@/lib/http/axios.js"
import {
    MuseumListSchema,
    MuseumSchema,
    type Museum,
    type MuseumId,
    type MuseumList,
    type CreateMuseum,
    type UpdateMuseum,
    CreateMuseumSchema
} from "../schema/museum.js"

export async function getMuseumList(): Promise<MuseumList> {
    const response = await http.get('/museums')
    return MuseumListSchema.parse(response.data)
}

export async function getMuseum(id: MuseumId): Promise<Museum> {
    const response = await http.get(`/museums/${id}`)
    return MuseumSchema.parse(response.data)
}

export async function createMuseum(museum: CreateMuseum): Promise<Museum> {
    const body = CreateMuseumSchema.parse(museum)
    const response = await http.post('/museums', body)
    return MuseumSchema.parse(response.data)
}

export async function updateMuseum(id: MuseumId, museum: UpdateMuseum): Promise<Museum> {
    const body = CreateMuseumSchema.parse(museum)
    const response = await http.patch(`/museums/${id}`, body)
    return MuseumSchema.parse(response.data)
}

export async function deleteMuseum(id: MuseumId): Promise<void> {
    await http.delete(`/museums/${id}`)
}