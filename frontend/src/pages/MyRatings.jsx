import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function MyRatings() {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRatings();
  }, []);

  const fetchMyRatings = async () => {
    try {
      const response = await api.get("/ratings/my");

      setRatings(response.data.ratings);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this rating permanently?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/ratings/${id}`);

      toast.success("Rating deleted successfully ✅");

      setRatings((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete rating"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        {/* Heading */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-extrabold text-blue-700">
              ⭐ My Ratings
            </h1>

            <p className="text-gray-600 mt-2">
              View, edit or remove your submitted ratings.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg px-6 py-4 mt-5 md:mt-0">

            <p className="text-gray-500">
              Total Ratings
            </p>

            <h2 className="text-3xl font-bold text-blue-600">
              {ratings.length}
            </h2>

          </div>

        </div>

        {ratings.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

            <div className="text-7xl mb-5">
              ⭐
            </div>

            <h2 className="text-3xl font-bold text-gray-700">
              No Ratings Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Visit the Stores page and rate your favorite stores.
            </p>

            <button
              onClick={() => navigate("/stores")}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Browse Stores
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {ratings.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">

                  <h2 className="text-2xl font-bold">
                    🏪 {item.store_name}
                  </h2>

                  <p className="text-blue-100 mt-2">
                    📍 {item.address}
                  </p>

                </div>

                <div className="p-6">

                  <div className="bg-gray-50 rounded-2xl p-5">

                    <div className="flex justify-between items-center">

                      <span className="font-semibold text-gray-600">
                        Your Rating
                      </span>

                      <span className="text-yellow-500 text-2xl">
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                      </span>

                    </div>

                    <p className="mt-4 text-lg font-bold text-blue-600">
                      {item.rating} / 5
                    </p>

                    <p className="text-gray-500 mt-3">
                      Rated on{" "}
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <button
                      onClick={() =>
                        navigate("/rating", {
                          state: {
                            id: item.store_id,
                            name: item.store_name,
                            address: item.address,
                          },
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() => deleteRating(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyRatings;