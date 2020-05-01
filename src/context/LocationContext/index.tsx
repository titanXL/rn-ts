import { makeContext } from "../createContext";
import { Dispatch, Reducer } from "react";
import { LocationData } from "expo-location";

type LocationReducer = Reducer<IState, ActionTypes>;

interface IState {
  location: {
    recording: boolean;
    locations: LocationData[];
    currentLocation: LocationData | null;
    name: string;
  };
}

type ActionTypes =
  | { readonly type: "recording_start" }
  | { readonly type: "recording_stop" }
  | { readonly type: "add_location"; payload: LocationData }
  | { readonly type: "set_current_location"; payload: LocationData }
  | { readonly type: "change_name"; payload: string };

type ActionCreator<A> = {
  [key: string]: (dispatch: Dispatch<A>) => (payload?: any) => void;
};

type ContextType = IState &
  {
    [key in keyof typeof actionCreators]: ReturnType<
      typeof actionCreators[key]
    >;
  };

const locationReducer: LocationReducer = (state, action) => {
  switch (action.type) {
    case "recording_start":
      return {
        ...state,
        location: {
          ...state.location,
          recording: true,
        },
      };
    case "recording_stop":
      return {
        ...state,
        location: {
          ...state.location,
          recording: false,
        },
      };
    case "set_current_location": {
      return {
        ...state,
        location: {
          ...state.location,
          currentLocation: action.payload,
        },
      };
    }
    case "add_location": {
      return {
        ...state,
        location: {
          ...state.location,
          locations: [...state.location.locations, action.payload],
        },
      };
    }
    default:
      return state;
  }
};

const actionCreators = {
  startRecording: (dispatch: Dispatch<ActionTypes>) => () =>
    dispatch({ type: "recording_start" }),
  stopRecording: (dispatch: Dispatch<ActionTypes>) => () =>
    dispatch({ type: "recording_stop" }),
  addLocation: (dispatch: Dispatch<ActionTypes>) => ({
    location,
    recording,
  }: {
    location: LocationData;
    recording: boolean;
  }) => {
    dispatch({
      type: "set_current_location",
      payload: location,
    });
    if (recording) {
      dispatch({
        type: "add_location",
        payload: location,
      });
    }
  },
  changeName: (dispatch: Dispatch<ActionTypes>) => (name: string) =>
    dispatch({ type: "change_name", payload: name }),
};

export const { Provider, Context } = makeContext<
  LocationReducer,
  ActionCreator<ActionTypes>,
  IState,
  ContextType
>(
  locationReducer,
  { ...actionCreators },
  {
    location: {
      recording: false,
      locations: [],
      currentLocation: null,
      name: "",
    },
  }
);
