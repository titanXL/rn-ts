import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContet } from "../../context/AuthContext";
import { Spacer } from "../../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProps {}

export const AccountScreen: React.FC<IProps> = ({}) => {
  const { signOut } = useContext(AuthContet);
  return (
    <SafeAreaView>
      <Text>Account Screen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signOut} />
      </Spacer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
