import React from 'react';
import { useImmerReducer } from 'use-immer';
//
import { reducer, AdjustmentAction, StateType } from './reducer';

interface CartContextType extends StateType {
  dispatch: React.Dispatch<AdjustmentAction>;
}

const initialState: StateType = {
  items: [],
  totalSum: 0,
};

export const CartContext = React.createContext<CartContextType>(
  initialState as CartContextType
);

export const CartContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
