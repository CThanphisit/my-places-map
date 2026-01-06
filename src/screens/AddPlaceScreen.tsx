import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, {
  MapPressEvent,
  Marker,
  PoiClickEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Button, Divider, Menu, TextInput } from "react-native-paper";
import { Place, PlaceCategory } from "../types/place";
import uuid from "react-native-uuid";
import { savePlace } from "../storages/placesStorage";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const AddPlaceScreen = (props: Props) => {
  const navigation = useNavigation();
  const mapRef = useRef<any>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<PlaceCategory | null>(null);

  const [visible, setVisible] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  console.log("selectedPoi", selectedLocation);

  const openMenu = () => {
    console.log("Opening...");
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 10);
  };

  const closeMenu = () => {
    console.log("Closing...");
    setVisible(false);
  };

  const onSelect = (value: any) => {
    setCategory(value);
    closeMenu();
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;

    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const handleSave = async () => {
    if (!selectedLocation || !title || !category) return;

    const places: Place = {
      id: uuid.v4().toString(),
      title,
      description,
      category,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      createdAt: Date.now(),
    };

    await savePlace(places);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20, marginVertical: 50 }}>
      <View style={styles.inputGroup}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter your Title"
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter your Description"
          numberOfLines={4}
          multiline={true}
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          // anchor ควรกว้างเท่ากับ TextInput เพื่อให้เมนูเด้งออกมาตรงตำแหน่งพอดี
          anchor={
            <Pressable onPress={openMenu} style={{ width: "100%" }}>
              <View pointerEvents="none">
                <TextInput
                  label="เลือกรายการ"
                  value={category ?? ""}
                  editable={false}
                  mode="outlined"
                  right={<TextInput.Icon icon="chevron-down" />}
                />
              </View>
            </Pressable>
          }
        >
          <Menu.Item onPress={() => onSelect("food")} title="Food" />
          <Menu.Item onPress={() => onSelect("travel")} title="Travel" />
          <Divider />
          <Menu.Item onPress={() => onSelect("work")} title="Work" />
          <Menu.Item onPress={() => onSelect("other")} title="Other" />
        </Menu>
      </View>

      <View style={{ flex: 1, marginBottom: 20 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 14.985583,
            longitude: 102.105482,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          showsUserLocation
          showsMyLocationButton
          toolbarEnabled={false}
          onPress={handleMapPress}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      </View>

      <View style={styles.inputGroup}>
        <Button mode="contained" onPress={() => handleSave()}>
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default AddPlaceScreen;
