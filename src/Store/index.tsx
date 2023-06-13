import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { authAction, authInitialState } from "./auth";
import { todo, todoActions } from "./tasks";

const iInitialValue: any = {
  ...authInitialState,
  ...todo,
};

const Actions = {
  ...authAction,
  ...todoActions,
};

const reducer = (state: any, action: any) => {
  const actions = (Actions as any)[action.type];
  const update = actions(state, action.payload);
  return { ...state, ...update };
};

const ContextLoader = createContext(iInitialValue);

interface Props {
  children: React.ReactNode;
}

export const ContextStore: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<any>(reducer, iInitialValue);

  return (
    <ContextLoader.Provider value={{ state, dispatch }}>
      {children}
    </ContextLoader.Provider>
  );
};

export function useStore() {
  const { state, dispatch } = useContext(ContextLoader);
  return { state, dispatch };
}

export default {};
