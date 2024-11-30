// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/authSlice';
import screenReducer from './slices/screenSlice';
import { tasksReducer } from './slices/tasksSlice';

// Učitavanje prethodnog stanja iz localStorage
const loadAuthState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('auth');
    return serializedState ? JSON.parse(serializedState) : { isAuthenticated: false, token: null };
  } catch (err) {
    return { isAuthenticated: false, token: null }; // Povratna vrednost ako dođe do greške
  }
};

// Čuvanje trenutnog stanja u localStorage
const saveAuthState = (state: { auth: AuthState }) => {
  try {
    const serializedState = JSON.stringify(state.auth);
    localStorage.setItem('auth', serializedState);
  } catch (err) {
    console.error("Could not save auth state:", err);
  }
};

// Učitavanje prethodnog stanja
const preloadedAuthState = loadAuthState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    screen: screenReducer,
    tasks: tasksReducer,
  },
  preloadedState: { auth: preloadedAuthState },
});

// Pretplata za čuvanje stanja pri promeni
store.subscribe(() => saveAuthState(store.getState()));


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
