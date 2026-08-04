import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await api.get("/auth/profile");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = (path) =>
    location.pathname === path
      ? "bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow"
      : "hover:bg-blue-500 px-4 py-2 rounded-lg transition";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
              🏪
            </div>

            <div>
              <h1 className="text-lg md:text-xl font-bold">
                Store Rating
              </h1>

              <p className="text-xs text-blue-100">
                Management System
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">

            <Link to="/dashboard" className={linkStyle("/dashboard")}>
              🏠 Dashboard
            </Link>

            <Link to="/stores" className={linkStyle("/stores")}>
              🏪 Stores
            </Link>

            <Link to="/my-ratings" className={linkStyle("/my-ratings")}>
              ⭐ My Ratings
            </Link>

            <Link to="/profile" className={linkStyle("/profile")}>
              👤 Profile
            </Link>

          </div>

          {/* Desktop User */}
          <div className="hidden md:flex items-center gap-4">

            <div className="text-right">

              <p className="text-sm text-blue-100">
                Welcome
              </p>

              <p className="font-semibold">
                {user?.name || "User"}
              </p>

            </div>

            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>

      </nav>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-blue-700 text-white shadow-lg">

          <div className="flex flex-col px-6 py-4 gap-4">

            <p className="font-semibold">
              👋 Welcome {user?.name || "User"}
            </p>

            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/stores"
              onClick={() => setMenuOpen(false)}
            >
              🏪 Stores
            </Link>

            <Link
              to="/my-ratings"
              onClick={() => setMenuOpen(false)}
            >
              ⭐ My Ratings
            </Link>

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
            >
              👤 Profile
            </Link>

            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

      )}
    </>
  );
}

export default Navbar;