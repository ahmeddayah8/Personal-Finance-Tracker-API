import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Not found */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;