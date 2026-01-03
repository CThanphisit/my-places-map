import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location"; // นำเข้าตัวจัดการ Location
import { useNavigation } from "@react-navigation/native";
import { mockPlaces } from "./src/data/mockData";
import { Drawer } from "react-native-drawer-layout";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomMarker from "./src/components/CustomMarker";

const marker_food = require("./assets/marker-food.png");
const marker_work = require("./assets/marker-work.png");
const marker_travel = require("./assets/marker-travel.png");
const marker_other = require("./assets/marker-other.png");

export default function App() {
  const mapRef = useRef<any>(null);
  const navigation = useNavigation;
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [selectPinValue, setSelectPinValue] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

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

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('Sheet index changed to:', index);
  // }, []);

  // const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
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
          ref={mapRef}
        >
          {mockPlaces.map((place, index) => (
            <Marker
              key={index}
              coordinate={place}
              onPress={() => onMaskerSelected(place, index)}
              image={
                place.category === "food"
                  ? marker_food
                  : place.category === "work"
                  ? marker_work
                  : place.category === "travel"
                  ? marker_travel
                  : marker_other
              }
            >
              {/* <CustomMarker category={place.category} /> */}
            </Marker>
          ))}
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
});
