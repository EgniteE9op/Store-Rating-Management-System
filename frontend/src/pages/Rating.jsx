import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
function Rating() {

  const navigate = useNavigate();
  const location = useLocation();

 const store = location.state;

if (!store) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600">
        Store not found
      </h1>
    </div>
  );
}

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchMyRating = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          `/ratings/my-rating/${store.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.rating) {
          setRating(response.data.rating.rating);
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchMyRating();

  }, [store]);



  const submitRating = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/ratings",
        {
          store_id: store.id,
          rating: rating
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      navigate("/stores");

    } catch (error) {

      console.error(error);

      if (error.response) {
     toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }

    }

  };



  if (loading) {

    return (

      <div className="min-h-screen bg-gray-100">

        <Navbar />

        <div className="flex justify-center items-center h-[80vh]">

          <h2 className="text-2xl font-bold text-blue-600">
            Loading...
          </h2>

        </div>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-8">

        <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-blue-600">
            ⭐ Rate Store
          </h1>

          <h2 className="text-xl font-semibold text-center mt-5">
            {store.name}
          </h2>

          <p className="text-center text-gray-500 mt-2">
            {store.address}
          </p>

          <div className="flex justify-center gap-3 mt-8">

            {[1,2,3,4,5].map((star)=>(

              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-5xl transition ${
                  rating >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>

            ))}

          </div>

          <p className="text-center mt-4 text-gray-600">

            Selected Rating:
            <span className="font-bold text-blue-600">
              {" "} {rating} / 5
            </span>

          </p>

          <button
            onClick={submitRating}
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Save Rating ⭐
          </button>

        </div>

      </div>

    </div>

  );

}

export default Rating;