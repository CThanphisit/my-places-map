import { View } from "react-native";

export default function CustomMarker({ category }: { category: string }) {
  const color: Record<string, string> = {
    food: "red",
    travel: "blue",
    work: "green",
    other: "gray",
  };

  const selectColor = color[category] || color.other;

  return (
    <View
      style={{
        backgroundColor: selectColor,
        padding: 8,
        borderRadius: 20,
      }}
    />
  );
}
