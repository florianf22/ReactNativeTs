import { User } from '../../types/user';

interface UserToken extends User {
  token: string;
}

type LoginAction = {
  type: 'signup' | 'login';
  payload: UserToken;
};

type LogoutAction = {
  type: 'logout';
};

export type AdjustmentAction = LoginAction | LogoutAction;

export interface StateType {
  email: string;
  password: string;
  token: string;
}

export const reducer = (
  state: StateType,
  action: AdjustmentAction
): StateType => {
  switch (action.type) {
    case 'signup': {
      return {
        email: action.payload.email,
        password: action.payload.password,
        token: action.payload.token,
      };
    }
    case 'login': {
      return {
        email: action.payload.email,
        password: action.payload.password,
        token: action.payload.token,
      };
    }

    case 'logout': {
      return { email: '', password: '', token: '' };
    }

    default: {
      return state;
    }
  }
};
