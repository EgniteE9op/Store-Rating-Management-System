import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";


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

    const filtered = stores.filter((store) =>

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

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Heading */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-blue-600">
              🏪 Stores
            </h1>

            <p className="text-gray-500 mt-2">
              Browse stores and rate your experience.
            </p>

          </div>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search by store name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Loading */}

        {loading ? (

         <LoadingSpinner />

        ) : filteredStores.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-2xl font-bold text-gray-500">
              No Stores Found 😔
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredStores.map((store) => (

              <div
                key={store.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
              >

                <h2 className="text-2xl font-bold text-gray-800">
                  🏪 {store.name}
                </h2>

                <p className="text-gray-500 mt-3">
                  📍 {store.address}
                </p>

                <div className="mt-5 space-y-2">

                  <p className="text-yellow-500 font-semibold">

                    ⭐ Average Rating :

                    <span className="text-gray-700">
                      {" "}
                      {store.average_rating}
                    </span>

                  </p>

                  <p className="text-blue-600 font-semibold">

                    👥 Total Ratings :

                    <span className="text-gray-700">
                      {" "}
                      {store.total_ratings}
                    </span>

                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate("/rating", {
                      state: store,
                    })
                  }
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  ⭐ Rate Store
                </button>
                          
                  <button
  onClick={() => navigate(`/stores/${store.id}`)}
  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
>
  👁️ View Details
</button>       
              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Stores;