import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-lg">

        <div className="text-7xl mb-4">🚫</div>

        <h1 className="text-6xl font-extrabold text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          🏠 Back to Dashboard
        </Link>

      </div>
    </div>
  );
}

export default NotFound;