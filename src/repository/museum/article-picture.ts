import type { MuseumId } from "@/schema/museum.js";
import type { ArticleId } from "@/schema/article.js";
import {
  PictureListSchema,
  type PictureIdList,
  type PictureList,
} from "@/schema/picture.js";

export class ArticlePictureRepository {
  readonly baseURL: string;

  constructor(baseURL: string, museumId: MuseumId, articleId: ArticleId) {
    this.baseURL = `${baseURL}/museums/${museumId}/articles/${articleId}/pictures`;
  }

  async get(): Promise<PictureList> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return PictureListSchema.parse(await response.json());
  }

  async put(pictureIds: PictureIdList): Promise<PictureList> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(pictureIds),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return PictureListSchema.parse(await response.json());
  }
}
