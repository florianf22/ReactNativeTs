import React from 'react';
import { useImmerReducer } from 'use-immer';
//
import { reducer, AdjustmentAction, StateType } from './reducer';

interface ItemContextType extends StateType {
  dispatch: React.Dispatch<AdjustmentAction>;
}

const initialState: StateType = {
  items: [],
  item: undefined,
};

export const ItemContext = React.createContext<ItemContextType>(
  initialState as ItemContextType
);

export const ItemContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <ItemContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};
