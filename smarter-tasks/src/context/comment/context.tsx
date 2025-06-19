import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { initialState, CommentState, CommentDispatch } from './types';

const CommentStateContext = createContext<CommentState>(initialState);
const CommentDispatchContext = createContext<CommentDispatch>(() => {});

export const CommentProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CommentStateContext.Provider value={state}>
      <CommentDispatchContext.Provider value={dispatch}>
        {children}
      </CommentDispatchContext.Provider>
    </CommentStateContext.Provider>
  );
};

export const useCommentState = () => useContext(CommentStateContext);
export const useCommentDispatch = () => useContext(CommentDispatchContext);