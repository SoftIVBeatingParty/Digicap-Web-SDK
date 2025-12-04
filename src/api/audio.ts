import type { MuseumId } from "@/schema/museum.js"
import { http } from "@/lib/http/axios.js"
import {
    AudioListSchema,
    AudioSchema,
    type Audio,
    type AudioList,
} from "../schema/audio.js"

export async function getAudioList(museumId: MuseumId): Promise<AudioList> {
    const response = await http.get(`/museums/${museumId}/audios`)
    return AudioListSchema.parse(response.data)
}

export async function getAudio(museumId: MuseumId, id: string): Promise<Audio> {
    const response = await http.get(`/museums/${museumId}/audios/${id}`)
    return AudioSchema.parse(response.data)
}

export async function createAudio(museumId: MuseumId, file: File): Promise<Audio> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await http.post(`/museums/${museumId}/audios`, formData)
    return AudioSchema.parse(response.data)
}

export async function deleteAudio(museumId: MuseumId, id: string): Promise<void> {
    await http.delete(`/museums/${museumId}/audios/${id}`)
}