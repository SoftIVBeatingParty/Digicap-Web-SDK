import { UserListSchema, type UserId, type UserList } from "@/schema/user.js";
import {
  MuseumListSchema,
  MuseumSchema,
  type Museum,
  type MuseumId,
  type MuseumList,
  type CreateMuseum,
  type UpdateMuseum,
} from "@/schema/museum.js";
import {
  PictureSchema,
  type Picture,
  type PictureId,
} from "@/schema/picture.js";
import z from "zod";

const RoleEnum = z.enum(["admin", "owner", "staff", "guest"]);

export type Role = z.infer<typeof RoleEnum>;

export class MuseumRepository {
  constructor(readonly baseURL: string) {
    this.baseURL = `${baseURL}/museums`;
  }

  async collect(): Promise<MuseumList> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return MuseumListSchema.parse(await response.json());
  }

  async get(id: MuseumId): Promise<Museum> {
    const url = `${this.baseURL}/${id}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return MuseumSchema.parse(await response.json());
  }

  async create(museum: CreateMuseum): Promise<Museum> {
    const url = `${this.baseURL}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(museum),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return MuseumSchema.parse(await response.json());
  }

  async update(id: MuseumId, museum: UpdateMuseum): Promise<Museum> {
    const url = `${this.baseURL}/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(museum),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return MuseumSchema.parse(await response.json());
  }

  async delete(id: MuseumId): Promise<void> {
    const url = `${this.baseURL}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async invite(museumId: MuseumId, email: string): Promise<void> {
    const url = `${this.baseURL}/${museumId}/users`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(email),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async reject(museumId: MuseumId, userId: UserId): Promise<void> {
    const url = `${this.baseURL}/${museumId}/users/${userId}`;
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async everyone(museumId: MuseumId): Promise<UserList> {
    const url = `${this.baseURL}/${museumId}/users`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return UserListSchema.parse(await response.json());
  }

  async getThumbnail(museumId: MuseumId): Promise<Picture> {
    const url = `${this.baseURL}/${museumId}/thumbnail-picture`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return PictureSchema.parse(await response.json());
  }

  async setThumbnail(museumId: MuseumId, pictureId: PictureId): Promise<void> {
    const url = `${this.baseURL}/${museumId}/thumbnail-picture`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(pictureId),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async getOwnerships(museumId: MuseumId): Promise<UserList> {
    const url = `${this.baseURL}/${museumId}/users/ownership`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return UserListSchema.parse(await response.json());
  }

  async grant(museumId: MuseumId, userId: UserId): Promise<void> {
    const url = `${this.baseURL}/${museumId}/users/${userId}/ownership`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async revoke(museumId: MuseumId, userId: UserId): Promise<void> {
    const url = `${this.baseURL}/${museumId}/users/${userId}/ownership`;
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async getRole(museumId: MuseumId, userId: UserId): Promise<Role> {
    const url = `${this.baseURL}/${museumId}/users/${userId}/role`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return RoleEnum.parse(await response.json());
  }
}
