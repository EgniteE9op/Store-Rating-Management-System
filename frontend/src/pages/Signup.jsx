import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        address,
        password,
      });

      toast.success(
        response.data.message || "Account Created Successfully 🎉"
      );

      setName("");
      setEmail("");
      setAddress("");
      setPassword("");

      navigate("/login");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Logo */}

        <div className="flex justify-center mb-5">

          <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-4xl text-white shadow-lg">
            🏪
          </div>

        </div>

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join the Store Rating Management System
        </p>

        {/* Form */}

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          <div>

            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />

          </div>

          <div>

            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />

          </div>

          <div>

            <label className="block font-medium mb-2">
              Address
            </label>

            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />

          </div>

          <div>

            <label className="block font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;