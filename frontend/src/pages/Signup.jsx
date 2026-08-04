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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/signup",
        {
          name,
          email,
          address,
          password,
        }
      );

     toast.success(response.data.message);

      // Clear the form
      setName("");
      setEmail("");
      setAddress("");
      setPassword("");

      // Redirect to Login page
      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.success(response.data.message);
      } else {
       toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              name=""
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Address
            </label>

            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;