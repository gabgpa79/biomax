let user  = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));
const initialState = user ? { loggedIn: true, user, token } : {};

export function auth(state = initialState, action) {
  switch (action.type) {    
    case 'LOGIN_SUCCESS':
      return { 
          loggingIn: true,
          user: action.user
      };
    case 'LOGIN_USER':
      return {           
          ...state
      };
    case 'LOGIN_LOGOUT':
      return {           
          user: {}
      };                     
    default:
      return state
  }
}

