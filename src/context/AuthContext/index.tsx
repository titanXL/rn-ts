import { makeContext } from "../createContext";
import { Dispatch, Reducer } from "react";

import { AsyncStorage } from "react-native";
import { API } from "../../API";
import { navigate } from "../../../navigationRef";

type AuthReducer = Reducer<IState, ActionTypes>;

interface IState {
  auth: {
    token: string | null;
    errorMessage: string;
  };
}

interface IAuthEntity {
  email: string;
  password: string;
}

type ActionTypes =
  | { readonly type: "sign_up_sucssess"; payload: string }
  | { readonly type: "sign_up_error"; payload: string }
  | { readonly type: "sign_in_success"; payload: string }
  | { readonly type: "sign_in_error"; payload: string }
  | { readonly type: "sign_out" }
  | { readonly type: "clear_error_message" };

type ActionCreator<A> = {
  [key: string]: (dispatch: Dispatch<A>) => (payload?: any) => void;
};

type ContextType = IState &
  {
    [key in keyof typeof actionCreators]: ReturnType<
      typeof actionCreators[key]
    >;
  };

const actionCreators = {
  signIn: (dispatch: Dispatch<ActionTypes>) => async ({
    email = "test@test.com",
    password = "test",
  }: IAuthEntity) => {
    try {
      const token = await API.signIn({ email, password });
      await AsyncStorage.setItem("token", token);
      dispatch({
        type: "sign_in_success",
        payload: token,
      });
      navigate("MainScreens");
    } catch (error) {
      dispatch({
        type: "sign_in_error",
        payload: "Something went wrong",
      });
    }
  },
  signUp: (dispatch: Dispatch<ActionTypes>) => async ({
    email = "test@test.com",
    password = "test",
  }: IAuthEntity) => {
    try {
      const token = await API.signUp();
      await AsyncStorage.setItem("token", token);
      dispatch({
        type: "sign_up_sucssess",
        payload: token,
      });
      navigate("MainScreens");
    } catch (error) {
      dispatch({
        type: "sign_up_error",
        payload: "Something went wrong",
      });
    }
  },
  signOut: (dispatch: Dispatch<ActionTypes>) => () => {
    dispatch({ type: "sign_out" });
  },
  clearErrorMessage: (dispatch: Dispatch<ActionTypes>) => () =>
    dispatch({ type: "clear_error_message" }),
  tryLocalSignIn: (dispatch: Dispatch<ActionTypes>) => async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "sign_in_success", payload: token });
      navigate("MainScreens");
    } else {
      navigate("SignUp");
    }
  },
};

const authReducer = (
  state: IState = { auth: { token: null, errorMessage: "" } },
  action: ActionTypes
) => {
  switch (action.type) {
    case "sign_up_sucssess": {
      return {
        ...state,
        auth: {
          token: action.payload,
          errorMessage: "",
        },
      };
    }
    case "sign_up_error": {
      return {
        ...state,
        auth: {
          ...state.auth,
          errorMessage: action.payload,
        },
      };
    }
    case "sign_in_success":
      return {
        ...state,
        auth: {
          token: action.payload,
          errorMessage: "",
        },
      };
    case "sign_in_error": {
      return {
        ...state,
        auth: {
          ...state.auth,
          errorMessage: action.payload,
        },
      };
    }
    case "clear_error_message": {
      return {
        ...state,
        auth: {
          ...state.auth,
          errorMessage: "",
        },
      };
    }
    default:
      return state;
  }
};
// type ContextType = IState & AuthActionCreators;

export const { Provider, Context } = makeContext<
  AuthReducer,
  ActionCreator<ActionTypes>,
  IState,
  ContextType
>(
  authReducer,
  { ...actionCreators },
  { auth: { token: null, errorMessage: "" } }
);
