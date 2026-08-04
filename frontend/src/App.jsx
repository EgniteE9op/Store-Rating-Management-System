import { Routes, Route } from "react-router-dom";

// Public Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import StoreDetails from "./pages/StoreDetails";
import Rating from "./pages/Rating";
import Profile from "./pages/Profile";
import MyRatings from "./pages/MyRatings";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ==========================
          Public Routes
      =========================== */}

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

      {/* ==========================
          Protected Routes
      =========================== */}

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
        path="/stores/:id"
        element={
          <ProtectedRoute>
            <StoreDetails />
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

      {/* ==========================
          404 - Page Not Found
      =========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;