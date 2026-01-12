import type { MuseumId } from "@/schema/museum.js";
import type { SpotId } from "@/schema/spot.js";
import {
  ArticleSchema,
  type Article,
  type ArticleId,
} from "@/schema/article.js";

export class SpotArticleRepository {
  readonly baseURL: string;

  constructor(baseURL: string, museumId: MuseumId, spotId: SpotId) {
    this.baseURL = `${baseURL}/museums/${museumId}/spots/${spotId}/article`;
  }

  async get(): Promise<Article> {
    const response = await fetch(this.baseURL, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return ArticleSchema.parse(await response.json());
  }

  async put(articleId: ArticleId): Promise<void> {
    const response = await fetch(this.baseURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(articleId),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async delete(): Promise<void> {
    const response = await fetch(this.baseURL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
}
