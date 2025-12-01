import type { HttpClient } from "../core/http.js"
import type { MuseumId } from "../schema/museum.js"
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

/**
 * Returns an async function that fetches all tags for a specific museum from the API.
 * @param museumId - The branded ID of the museum whose tags are to be fetched.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a validated TagList.
 */
export function getTagList(museumId: MuseumId) {
    return async (client: HttpClient): Promise<TagList> => {
        return TagListSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/tags`
        }))
    }
}

/**
 * Returns an async function that fetches a single tag by its ID within a specific museum.
 * @param museumId - The branded ID of the museum the tag belongs to.
 * @param id - The branded ID of the tag.
 * @returns An async function that takes an HttpClient and returns a Promise resolving to a validated Tag.
 */
export function getTag(museumId: MuseumId, id: TagId) {
    return async (client: HttpClient): Promise<Tag> => {
        return TagSchema.parse(await client.fetch({
            method: 'GET',
            url: `/museums/${museumId}/tags/${id}`
        }))
    }
}

/**
 * Returns an async function that creates a new tag within a specific museum.
 * @param museumId - The branded ID of the museum where the tag will be created.
 * @param tag - The tag data to be created (must pass CreateTagSchema validation).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the validated created Tag.
 */
export function createTag(museumId: MuseumId, tag: CreateTag) {
    return async (client: HttpClient): Promise<Tag> => {
        return TagSchema.parse(await client.fetch({
            method: 'POST',
            url: `/museums/${museumId}/tags`,
            body: CreateTagSchema.parse(tag)
        }))
    }
}

/**
 * Returns an async function that updates an existing tag by its ID within a specific museum.
 * @param museumId - The branded ID of the museum the tag belongs to.
 * @param id - The branded ID of the tag to update.
 * @param tag - The partial tag data (must pass UpdateTagSchema validation).
 * @returns An async function that takes an HttpClient and returns a Promise resolving to the validated updated Tag.
 */
export function updateTag(museumId: MuseumId, id: TagId, tag: UpdateTag) {
    return async (client: HttpClient): Promise<Tag> => {
        return TagSchema.parse(await client.fetch({
            method: 'PATCH',
            url: `/museums/${museumId}/tags/${id}`,
            body: UpdateTagSchema.parse(tag)
        }))
    }
}

/**
 * Returns an async function that deletes a tag by its ID within a specific museum.
 * @param museumId - The branded ID of the museum the tag belongs to.
 * @param id - The branded ID of the tag to delete.
 * @returns An async function that takes an HttpClient and returns a Promise resolving when the tag is successfully deleted (returns void).
 */
export function deleteTag(museumId: MuseumId, id: TagId) {
    return async (client: HttpClient): Promise<void> => {
        await client.fetch({
            method: 'DELETE',
            url: `/museums/${museumId}/tags/${id}`
        })
    }
}