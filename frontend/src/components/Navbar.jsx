
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const linkStyle = (path) =>
    location.pathname === path
      ? "bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow"
      : "hover:bg-blue-500 px-4 py-2 rounded-lg transition";

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
              closeMenu();
            }}
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
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={30} />
          </button>

        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-blue-700 text-white z-50 transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-blue-500">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
              🏪
            </div>

            <div>
              <h2 className="font-bold">
                Store Rating
              </h2>

              <p className="text-xs text-blue-200">
                Management System
              </p>
            </div>
          </div>

          <button onClick={closeMenu}>
            <X size={28} />
          </button>
        </div>

        {/* User */}
        <div className="p-5 border-b border-blue-500">

          <p className="text-sm text-blue-200">
            Welcome
          </p>

          <p className="font-bold text-lg">
            {user?.name || "User"}
          </p>

        </div>

        {/* Navigation */}
        <div className="flex flex-col p-4 gap-3">

          <Link
            to="/dashboard"
            onClick={closeMenu}
            className={linkStyle("/dashboard")}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/stores"
            onClick={closeMenu}
            className={linkStyle("/stores")}
          >
            🏪 Stores
          </Link>

          <Link
            to="/my-ratings"
            onClick={closeMenu}
            className={linkStyle("/my-ratings")}
          >
            ⭐ My Ratings
          </Link>

          <Link
            to="/profile"
            onClick={closeMenu}
            className={linkStyle("/profile")}
          >
            👤 Profile
          </Link>

          <button
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
            className="bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold mt-3"
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </>
  );
}

export default Navbar;