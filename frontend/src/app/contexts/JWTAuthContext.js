import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { MatxLoading } from 'app/components';

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }
    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { user } = response.data;

    dispatch({ type: 'LOGIN', payload: { user } });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/auth/profile');
        dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: data.user } });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // Return children and AuthContext.Provider
  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login }}>
      {state.isInitialised ? children : <MatxLoading />}
    </AuthContext.Provider>
  );
};

export default AuthContext;
