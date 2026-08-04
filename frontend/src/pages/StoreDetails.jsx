import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function StoreDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoreDetails();
  }, [id]);

  const fetchStoreDetails = async () => {
    try {
      const response = await api.get(`/stores/${id}`);

      setStore(response.data.store);
      setRatings(response.data.ratings);
    } catch (error) {
      console.error(error);
      alert("Failed to load store details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        {/* Store Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            🏪 {store.name}
          </h1>

          <p className="mt-4 text-gray-600">
            📧 {store.email}
          </p>

          <p className="mt-2 text-gray-600">
            📍 {store.address}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-yellow-50 p-5 rounded-xl">

              <h3 className="text-gray-500">
                Average Rating
              </h3>

              <p className="text-3xl font-bold text-yellow-600 mt-2">
                ⭐ {store.average_rating} / 5
              </p>

            </div>

            <div className="bg-blue-50 p-5 rounded-xl">

              <h3 className="text-gray-500">
                Total Ratings
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                👥 {store.total_ratings}
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              navigate("/rating", {
                state: store,
              })
            }
            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            ⭐ Rate This Store
          </button>

        </div>

        {/* Ratings */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Customer Ratings
          </h2>

          {ratings.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">

              <h3 className="text-xl text-gray-500">
                No ratings yet.
              </h3>

            </div>

          ) : (

            <div className="space-y-5">

              {ratings.map((rating) => (

                <div
                  key={rating.id}
                  className="bg-white rounded-xl shadow-md p-6"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="text-xl font-bold">
                      👤 {rating.user_name}
                    </h3>

                    <span className="text-yellow-500 text-xl">
                      {"★".repeat(rating.rating)}
                      {"☆".repeat(5 - rating.rating)}
                    </span>

                  </div>

                  <p className="mt-2 text-gray-600">
                    Rating: {rating.rating} / 5
                  </p>

                  <p className="mt-2 text-gray-400 text-sm">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default StoreDetails;