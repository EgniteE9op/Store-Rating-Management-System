import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
       const navigate = useNavigate();
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    console.log("LOGIN RESPONSE:",response.data);
    // alert(response.data.message);
       localStorage.setItem(
  "token",
  response.data.token
);
     navigate("/dashboard");
  } catch (error) {
  console.error("Login Error:", error);

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
          Store Rating App
        </h1>
                  
        <form onSubmit={handleLogin}>
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to= "/signup" className="text-blue-600 cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;