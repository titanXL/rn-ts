import React from "react";
import { navigationRef } from "./navigationRef";
import { enableScreens } from "react-native-screens";
enableScreens();
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  SignInScreen,
  SignUpScreen,
  AccountScreen,
  TrackCreateScreen,
  TrackDetailScreen,
  TrackListScreen,
} from "./src/screens";
import { ResolveAuth } from "./src/screens/ResolveAuth";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ResolveAuth: undefined;
  MainScreens: undefined;
};

export type MainStackParamList = {
  TrackList: undefined;
  TrackDetails: undefined;
};

export type TabParamList = {
  TrackCreate: undefined;
  Account: undefined;
  Tracks: undefined;
};

type NavigationType<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>;
};

const StackAuth = createStackNavigator<AuthStackParamList>();
const StackMain = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const getTrackList = () => (
  <StackMain.Navigator headerMode="none">
    <StackMain.Screen name="TrackList" component={TrackListScreen} />
    <StackMain.Screen name="TrackDetails" component={TrackDetailScreen} />
  </StackMain.Navigator>
);

const getMainScreens = () => (
  <Tab.Navigator>
    <Tab.Screen name="Tracks" component={getTrackList} />
    <Tab.Screen name="Account" component={AccountScreen} />
    <Tab.Screen name="TrackCreate" component={TrackCreateScreen} />
  </Tab.Navigator>
);

export default () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <StackAuth.Navigator initialRouteName="ResolveAuth" headerMode="none">
            <StackAuth.Screen name="ResolveAuth" component={ResolveAuth} />
            <StackAuth.Screen name="SignIn" component={SignInScreen} />
            <StackAuth.Screen name="SignUp" component={SignUpScreen} />
            <StackAuth.Screen name="MainScreens" component={getMainScreens} />
          </StackAuth.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </LocationProvider>
  );
};
