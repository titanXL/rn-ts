import React, {
  useReducer,
  createContext,
  Dispatch,
  Reducer,
  ReducerState,
  ReducerAction,
} from "react";

type ActionCreator<A> = {
  [key: string]: (dispatch: Dispatch<A>) => (payload?: any) => void;
};

export const makeContext = <
  R extends Reducer<any, any>,
  A extends ActionCreator<ReducerAction<R>>,
  S extends ReducerState<R>,
  CTX
>(
  reducer: R,
  actionCreators: A,
  defaultState: S
) => {
  const Context = createContext<CTX>(defaultState);

  const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const boundActions: { [key: string]: (payload?: any) => void } = {};
    for (let key in actionCreators) {
      boundActions[key] = actionCreators[key](dispatch);
    }
    return (
      <Context.Provider value={{ ...state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return {
    Context,
    Provider,
  };
};
