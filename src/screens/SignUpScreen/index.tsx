import React, { useContext, useEffect } from "react";
import { Center } from "../../components/Center";
import { AuthForm } from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";
import { NavLink } from "../../components/NavLink";
import { useNavigation } from "@react-navigation/native";

interface IProps {}

export const SignUpScreen: React.FC<IProps> = ({}) => {
  const { auth, signUp, clearErrorMessage } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Center>
      <AuthForm
        errorMessage={auth.errorMessage}
        headerText="Sign Up for tracker"
        onSubmit={signUp}
        submitBtnText="Sign Up"
      />
      <NavLink
        to="SignIn"
        btnText="Already have an account ? Sign in instead!"
      />
    </Center>
  );
};
