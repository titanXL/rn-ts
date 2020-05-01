import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Map } from "../../components/Map";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProps {}

export const TrackCreateScreen: React.FC<IProps> = ({}) => {
  return (
    <SafeAreaView>
      <Text h3>Create a track</Text>
      <Map />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
