import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place } from "../types/place";

const PLACES_KEY = "places";
export const loadPlaces = async (): Promise<Place[]> => {
  try {
    const json = await AsyncStorage.getItem(PLACES_KEY);
    return json ? (JSON.parse(json) as Place[]) : [];
  } catch (error) {
    console.error("loadPlaces error", error);
    return [];
  }
};

export const savePlace = async (newPlace: Place): Promise<void> => {
  try {
    const places = await loadPlaces();
    const updatedPlaces = [...places, newPlace];

    await AsyncStorage.setItem(PLACES_KEY, JSON.stringify(updatedPlaces));
  } catch (error) {
    console.error("savePlace error", error);
  }
};

export const deletePlace = async (id: string): Promise<void> => {
  const places = await loadPlaces();
  const updated = places.filter((p) => p.id !== id);

  await AsyncStorage.setItem(PLACES_KEY, JSON.stringify(updated));
};
