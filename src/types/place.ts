// src/types/place.ts
export type PlaceCategory = "food" | "travel" | "work" | "other";

export type Place = {
  id: string;
  title: string;
  description?: string;
  category: PlaceCategory;
  latitude: number;
  longitude: number;
  createdAt: number;
};
