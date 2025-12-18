import type { MuseumId } from '@/schema/museum.js'
import type { ArticleId } from '@/schema/article.js'
import {
    AudioSchema,
    type Audio,
    type AudioId,
} from '@/schema/audio.js'

export class ArticleAudioRepository {
    
    readonly baseURL: string

    constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
        this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/audio`
    }

    async get(): Promise<Audio> {
        const response = await fetch(this.baseURL, {
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return AudioSchema.parse(await response.json())
    }

    async put(audioId: AudioId): Promise<void> {
        const response = await fetch(this.baseURL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(audioId),
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }
    }

    async delete(): Promise<void> {
        const response = await fetch(this.baseURL, {
            method: 'DELETE',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }
    }
}
