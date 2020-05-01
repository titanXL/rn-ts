import React, { useContext, useEffect } from "react";
import { Center } from "../../components/Center";
import { AuthForm } from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";
import { NavLink } from "../../components/NavLink";
import { useNavigation } from "@react-navigation/native";

interface IProps {}

export const SignInScreen: React.FC<IProps> = ({}) => {
  const { auth, signIn, clearErrorMessage } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("BLURED SIGN IN");
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Center>
      <AuthForm
        errorMessage={auth.errorMessage}
        headerText="Sign in tracker"
        onSubmit={signIn}
        submitBtnText="Sign In"
      />
      <NavLink to="SignUp" btnText="Don't have an account ? Sign up for one!" />
    </Center>
  );
};
