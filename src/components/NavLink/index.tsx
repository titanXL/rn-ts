import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Spacer } from "../Spacer";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthStackParamList } from "../../../App";

interface IProps {
  to: keyof AuthStackParamList;
  btnText: string;
}

export const NavLink: React.FC<IProps> = ({ to, btnText }) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(to)}>
      <Spacer>
        <Text style={styles.link}>{btnText}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});
