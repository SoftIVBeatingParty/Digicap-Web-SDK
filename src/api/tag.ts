import type { MuseumId } from "@/schema/museum.js"
import { http } from "@/lib/http/axios.js"
import {
    TagListSchema,
    TagSchema,
    CreateTagSchema,
    UpdateTagSchema,
    type Tag,
    type TagId,
    type TagList,
    type CreateTag,
    type UpdateTag
} from "../schema/tag.js"

export async function getTagList(museumId: MuseumId): Promise<TagList> {
    const response = await http.get(`/museums/${museumId}/tags`)
    return TagListSchema.parse(response.data)
}

export async function getTag(museumId: MuseumId, id: TagId): Promise<Tag> {
    const response = await http.get(`/museums/${museumId}/tags/${id}`)
    return TagSchema.parse(response.data)
}

export async function createTag(museumId: MuseumId, tag: CreateTag): Promise<Tag> {
    const body = CreateTagSchema.parse(tag)
    const response = await http.post(`/museums/${museumId}/tags`, body)
    return TagSchema.parse(response.data)
}

export async function updateTag(museumId: MuseumId, id: TagId, tag: UpdateTag): Promise<Tag> {
    const body = UpdateTagSchema.parse(tag)
    const response = await http.patch(`/museums/${museumId}/tags/${id}`, body)
    return TagSchema.parse(response.data)
}

export async function deleteTag(museumId: MuseumId, id: TagId): Promise<void> {
    await http.delete(`/museums/${museumId}/tags/${id}`)
}