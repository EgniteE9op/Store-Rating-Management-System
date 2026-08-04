
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import Profile from "./pages/Profile";
import Rating from "./pages/Rating";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import StoreDetails from "./pages/StoreDetails";
import MyRatings from "./pages/MyRatings";

function App() {
  return (
    <Routes>

      {/* =========================
          Public Routes
      ========================== */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* =========================
          Protected Routes
      ========================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stores"
        element={
          <ProtectedRoute>
            <Stores />
          </ProtectedRoute>
        }
      />

      <Route
  path="/my-ratings"
  element={
    <ProtectedRoute>
      <MyRatings />
    </ProtectedRoute>
  }
/>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rating"
        element={
          <ProtectedRoute>
            <Rating />
          </ProtectedRoute>
        }
      />

      {/* =========================
          404 Page
      ========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

      <Route
  path="/stores/:id"
  element={
    <ProtectedRoute>
      <StoreDetails />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;