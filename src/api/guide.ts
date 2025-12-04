import type { MuseumId } from "@/schema/museum.js"
import { http } from "@/lib/http/axios.js"
import {
    GuideListSchema,
    GuideSchema,
    CreateGuideSchema,
    UpdateGuideSchema,
    type Guide,
    type GuideId,
    type GuideList,
    type CreateGuide,
    type UpdateGuide
} from "@/schema/guide.js"

export async function getGuideList(museumId: MuseumId): Promise<GuideList> {
    const response = await http.get(`/museums/${museumId}/guides`)
    return GuideListSchema.parse(response.data)
}

export async function getGuide(museumId: MuseumId, id: GuideId): Promise<Guide> {
    const response = await http.get(`/museums/${museumId}/guides/${id}`)
    return GuideSchema.parse(response.data)
}

export async function createGuide(museumId: MuseumId, guide: CreateGuide): Promise<Guide> {
    const body = CreateGuideSchema.parse(guide)
    const response = await http.post(`/museums/${museumId}/guides`, body)
    return GuideSchema.parse(response.data)
}

export async function updateGuide(museumId: MuseumId, id: GuideId, guide: UpdateGuide): Promise<Guide> {
    const body = UpdateGuideSchema.parse(guide)
    const response = await http.patch(`/museums/${museumId}/guides/${id}`, body)
    return GuideSchema.parse(response.data)
}