import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../screens/MapScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import { StaticParamList } from "@react-navigation/native";

export const RootStack = createNativeStackNavigator({
  screens: {
    MapScreen: {
      screen: MapScreen,
      options: {
        // title: 'My home',
        headerShown: false,
      },
    },
    AddPlaceScreen: {
      screen: AddPlaceScreen,
      options: {
        // title: 'My home',
        headerShown: false,
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
