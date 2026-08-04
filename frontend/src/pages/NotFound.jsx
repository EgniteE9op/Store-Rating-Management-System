import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6">

      <h1 className="text-8xl font-bold text-blue-600">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4 text-gray-800">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-3 text-center max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Dashboard
      </Link>

    </div>
  );
}

export default NotFound;