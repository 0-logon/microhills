import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./store/slices/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainView from "./views/MainView";
import GuestRoute from "./routes/GuestRoute";
import { AppDispatch, RootState } from "./store";
import { fetchTasks } from "./store/slices/tasksSlice";

const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    // Preuzimanje tokena iz localStorage
    const token = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth')!).token
      : null;
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

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
