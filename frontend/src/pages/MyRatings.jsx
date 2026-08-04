import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function MyRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRatings();
  }, []);

  // Fetch all ratings of logged-in user
  const fetchMyRatings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/ratings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRatings(response.data.ratings);

    } catch (error) {
      console.error(error);
      alert("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  // Delete rating
  const deleteRating = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this rating?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/ratings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Rating deleted successfully ✅");

      // Refresh list
      fetchMyRatings();

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to delete rating");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-3xl font-bold text-blue-600">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          ⭐ My Ratings
        </h1>

        {ratings.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl text-gray-500">
              You haven't rated any stores yet.
            </h2>
          </div>

        ) : (

          <div className="space-y-6">

            {ratings.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <h2 className="text-2xl font-bold text-blue-600">
                  🏪 {item.store_name}
                </h2>

                <p className="text-gray-500 mt-2">
                  📍 {item.address}
                </p>

                <div className="text-yellow-500 text-2xl mt-4">
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </div>

                <p className="mt-2 font-semibold">
                  Rating: {item.rating} / 5
                </p>

                <p className="text-gray-400 mt-2">
                  Rated on{" "}
                  {new Date(item.created_at).toLocaleDateString()}
                </p>

              <div className="flex gap-4 mt-5">

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
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
  >
    ✏ Edit Rating
  </button>

  <button
    onClick={() => deleteRating(item.id)}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
  >
    🗑 Delete Rating
  </button>

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