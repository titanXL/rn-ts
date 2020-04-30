import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Center } from "../../components/Center";

interface IProps {}

export const TrackListScreen: React.FC<IProps> = ({}) => {
  const navigation = useNavigation();
  return (
    <Center>
      <Text>TrackList Screen</Text>
      <Button
        title="Go to details"
        onPress={() => navigation.navigate("TrackDetails")}
      />
    </Center>
  );
};
const styles = StyleSheet.create({});
