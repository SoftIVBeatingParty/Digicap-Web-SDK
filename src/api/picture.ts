import type { MuseumId } from "@/schema/museum.js"
import { http } from "@/lib/http/axios.js"
import {
    PictureListSchema,
    PictureSchema,
    type Picture,
    type PictureList,
} from "../schema/picture.js"

export async function getPictureList(museumId: MuseumId): Promise<PictureList> {
    const response = await http.get(`/museums/${museumId}/pictures`)
    return PictureListSchema.parse(response.data)
}

export async function getPicture(museumId: MuseumId, id: string): Promise<Picture> {
    const response = await http.get(`/museums/${museumId}/pictures/${id}`)
    return PictureSchema.parse(response.data)
}

export async function createPicture(museumId: MuseumId, file: File): Promise<Picture> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await http.post(`/museums/${museumId}/pictures`, formData)
    return PictureSchema.parse(response.data)
}

export async function deletePicture(museumId: MuseumId, id: string): Promise<void> {
    await http.delete(`/museums/${museumId}/pictures/${id}`)
}