import "../../utils/_mockLocation";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Map } from "../../components/Map";
import { SafeAreaView } from "react-native-safe-area-context";

import { Context as LocationContext } from "../../context/LocationContext";
import { useLocation } from "../../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";
import { TrackForm } from "../../components/TrackForm";

interface IProps {}

export const TrackCreateScreen: React.FC<IProps> = ({}) => {
  const { addLocation } = useContext(LocationContext);
  const isFocused = useIsFocused();
  const [err] = useLocation(isFocused, addLocation);
  return (
    <SafeAreaView>
      <Text h3>Create a track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
