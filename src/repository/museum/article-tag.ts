import type { MuseumId } from "@/schema/museum.js";
import type { ArticleId } from "@/schema/article.js";
import { TagListSchema, type TagIdList, type TagList } from "@/schema/tag.js";

export class ArticleTagRepository {
  readonly baseURL: string;

  constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
    this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/tags`;
  }

  async get(): Promise<TagList> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return TagListSchema.parse(await response.json());
  }

  async put(tagIds: TagIdList): Promise<TagList> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(tagIds),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return TagListSchema.parse(await response.json());
  }
}
