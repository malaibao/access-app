import { LOGIN, REGISTER, LOGOUT } from './action-types';

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: payload.token,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};
