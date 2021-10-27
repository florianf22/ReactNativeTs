import React, { useReducer } from 'react';
import { StateType, AdjustmentAction, reducer } from './reducer';

interface AuthContextType extends StateType {
  dispatch: React.Dispatch<AdjustmentAction>;
}

const initialState: StateType = {
  email: '',
  password: '',
  token: '',
};

export const AuthContext = React.createContext<AuthContextType>(
  initialState as AuthContextType
);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
