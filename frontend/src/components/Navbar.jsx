import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >

          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
            🏪
          </div>

          <div>

            <h1 className="text-xl font-bold">
              Store Rating
            </h1>

            <p className="text-xs text-blue-100">
              Management System
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex items-center gap-2">

          <Link
            to="/dashboard"
            className={linkStyle("/dashboard")}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/stores"
            className={linkStyle("/stores")}
          >
            🏪 Stores
          </Link>

           <Link
         to="/my-ratings"
        className={linkStyle("/my-ratings")}
              >
            ⭐ My Ratings
            </Link> 

          <Link
            to="/profile"
            className={linkStyle("/profile")}
          >
            👤 Profile
          </Link>

        </div>

        {/* User */}

        <div className="flex items-center gap-4">

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
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-semibold"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;