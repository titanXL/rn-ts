import React from "react";
import { View, StyleSheet } from "react-native";

interface IProps {}

export const Spacer: React.FC<IProps> = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});
