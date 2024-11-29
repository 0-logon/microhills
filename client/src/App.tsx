import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./store/slices/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainView from "./views/MainView";
import GuestRoute from "./routes/GuestRoute";

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Preuzimanje tokena iz localStorage
    const token = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth')!).token
      : null;
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginView />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterView />
            </GuestRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
