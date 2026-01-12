import type { MuseumId } from "@/schema/museum.js";
import type { TagId } from "@/schema/tag.js";
import { type ArticleList, ArticleListSchema } from "@/schema/article.js";

export class TagArticleRepository {
  readonly baseURL: string;
  constructor(baseURL: string, museumId: MuseumId, tagId: TagId) {
    this.baseURL = `${baseURL}/museums/${museumId}/tags/${tagId}/articles`;
  }

  async get(): Promise<ArticleList> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return ArticleListSchema.parse(await response.json());
  }
}
