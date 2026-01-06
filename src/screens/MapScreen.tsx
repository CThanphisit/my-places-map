import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mockPlaces } from "../data/mockData";

import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { loadPlaces } from "../storages/placesStorage";
import { Place } from "../types/place";

const marker_food = require("../../assets/marker-food.png");
const marker_work = require("../../assets/marker-work.png");
const marker_travel = require("../../assets/marker-travel.png");
const marker_other = require("../../assets/marker-other.png");

type Props = {};

function MapScreen({}: Props) {
  const mapRef = useRef<any>(null);
  const navigation = useNavigation();
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [selectPinValue, setSelectPinValue] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPlaces().then(setPlaces);
    }, [])
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const onMaskerSelected = (marker: any, index: number) => {
    setSelectPinValue(marker);
    bottomSheetRef.current?.expand();
    mapRef.current?.animateToRegion(
      {
        latitude: marker.latitude - 0.001,
        longitude: marker.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      1000
    );
  };

  const onMarkerPress = (place: any, index: number) => {
    setSelectedIndex(index); // เก็บ index ที่เลือก
    onMaskerSelected(place, index); // เรียกฟังก์ชันเดิมของคุณ
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
        >
          {places.map((place, index) => {
            // const isSelected = selectedIndex === index;

            let markerImage = marker_other;
            if (place.category === "food") markerImage = marker_food;
            else if (place.category === "work") markerImage = marker_work;
            else if (place.category === "travel") markerImage = marker_travel;

            return (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                onPress={() => onMarkerPress(place, index)}
                image={
                  place.category === "food"
                    ? marker_food
                    : place.category === "work"
                    ? marker_work
                    : place.category === "travel"
                    ? marker_travel
                    : marker_other
                }
              ></Marker>
            );
          })}
        </MapView>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
          enablePanDownToClose
        >
          <BottomSheetView style={styles.sheetContent}>
            <Text style={styles.title}>รายละเอียดสถานที่ 📍</Text>
            <Text style={styles.sheetText}>{selectPinValue?.title}</Text>
          </BottomSheetView>
        </BottomSheet>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddPlaceScreen")}
        >
          <AntDesign name="plus" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  sheetContent: { flex: 1, alignItems: "center", padding: 20 },
  sheetText: { fontSize: 24, marginBottom: 20 },
  fab: {
    width: 60,
    height: 60,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    right: 25,
    backgroundColor: "#f4a003",
    borderRadius: 100,
    position: "absolute",
  },
});

export default MapScreen;
