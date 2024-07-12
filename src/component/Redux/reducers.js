
const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  export function authReducer (state = initialState, action) {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token', action.payload);
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
        };
      case 'REGISTER_FAIL':
      case 'LOGIN_FAIL':
        localStorage.removeItem('token');
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      case 'GET_USER':
         return({...state, user:action.payload})
      default:
        return state;
    }
  }
  