import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline, LatLng } from "react-native-maps";

interface IProps {}

export const Map: React.FC<IProps> = ({}) => {
  let points: LatLng[] = [];
  for (let i = 0; i < 20; i++) {
    points.push({
      longitude: 23.3219 + i * 0.001,
      latitude: 42.6977 + i * 0.001,
    });
  }
  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={{
        longitude: 23.3219,
        latitude: 42.6977,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Polyline coordinates={points} />
    </MapView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
