/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, MembersSate, MembersActions } from "./reducer";

type MembersDispatch = React.Dispatch<MembersActions>;
const MembersStateContext = createContext<MembersSate | undefined>(undefined);
const MembersDispatchContext = createContext<MembersDispatch | undefined>(undefined);

export const MembersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MembersStateContext.Provider value={state}>
      <MembersDispatchContext.Provider value={dispatch}>
        {children}
      </MembersDispatchContext.Provider>
    </MembersStateContext.Provider>
  );
};

export const useMembersState = () => useContext(MembersStateContext);

export const useMembersDispatch = () => useContext(MembersDispatchContext);
