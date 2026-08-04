import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";

function Stores() {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    const filtered = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStores(filtered);
  }, [search, stores]);

  const fetchStores = async () => {
    try {
      const response = await api.get("/stores");

      setStores(response.data.stores);
      setFilteredStores(response.data.stores);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Heading */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div>

            <h1 className="text-4xl font-extrabold text-blue-700">
              🏪 Stores
            </h1>

            <p className="text-gray-600 mt-2">
              Browse stores, view ratings and rate your experience.
            </p>

          </div>

          <div className="bg-white px-5 py-3 rounded-2xl shadow-lg">
            <span className="text-gray-500">
              Total Stores
            </span>

            <p className="text-3xl font-bold text-blue-600">
              {filteredStores.length}
            </p>
          </div>

        </div>

        {/* Search */}

        <div className="relative mb-10">

          <span className="absolute left-4 top-3.5 text-xl">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by store name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Loading */}

        {loading ? (
          <LoadingSpinner />
        ) : filteredStores.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

            <div className="text-7xl mb-5">
              🏪
            </div>

            <h2 className="text-3xl font-bold text-gray-700">
              No Stores Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredStores.map((store) => (

              <div
                key={store.id}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >

                {/* Header */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">

                  <h2 className="text-2xl font-bold">
                    🏪 {store.name}
                  </h2>

                  <p className="text-blue-100 mt-2">
                    📍 {store.address}
                  </p>

                </div>

                {/* Content */}

                <div className="p-6">

                  <div className="bg-gray-50 rounded-2xl p-4 space-y-4">

                    <div className="flex justify-between">

                      <span className="font-medium text-gray-600">
                        ⭐ Average Rating
                      </span>

                      <span className="font-bold text-yellow-500">
                        {store.average_rating || "0.0"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="font-medium text-gray-600">
                        👥 Total Ratings
                      </span>

                      <span className="font-bold text-blue-600">
                        {store.total_ratings}
                      </span>

                    </div>

                  </div>

                  {/* Buttons */}

                  <button
                    onClick={() =>
                      navigate("/rating", {
                        state: store,
                      })
                    }
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    ⭐ Rate Store
                  </button>

                  <button
                    onClick={() => navigate(`/stores/${store.id}`)}
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    👁 View Details
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

export default Stores;