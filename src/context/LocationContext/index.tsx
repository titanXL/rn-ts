import { makeContext } from "../createContext";
import { Dispatch, Reducer } from "react";
import { LocationData } from "expo-location";

type LocationReducer = Reducer<IState, ActionTypes>;

interface IState {
  location: {
    recording: boolean;
    locations: LocationData[];
    currentLocation: LocationData | null;
  };
}

type ActionTypes =
  | { readonly type: "recording_start" }
  | { readonly type: "recording_stop" }
  | { readonly type: "add_location"; payload: LocationData };

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
    case "add_location": {
      return {
        ...state,
        location: {
          ...state.location,
          currentLocation: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

const actionCreators = {
  startRecording: (dispatch: Dispatch<ActionTypes>) => () => {},
  stopRecording: (dispatch: Dispatch<ActionTypes>) => () => {},
  addLocation: (dispatch: Dispatch<ActionTypes>) => (location: LocationData) =>
    dispatch({
      type: "add_location",
      payload: location,
    }),
};

export const { Provider, Context } = makeContext<
  LocationReducer,
  ActionCreator<ActionTypes>,
  IState,
  ContextType
>(
  locationReducer,
  { ...actionCreators },
  { location: { recording: false, locations: [], currentLocation: null } }
);
