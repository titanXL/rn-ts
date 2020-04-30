import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface IProps {}

export const Center: React.FC<IProps> = ({ children }) => {
  return <View style={styles.center}>{children}</View>;
};
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    flex: 1,
  },
});
