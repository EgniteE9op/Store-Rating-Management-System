import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

function Dashboard() {

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalStores: 0,
    myRatings: 0,
    totalRatings: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);



  // Fetch logged-in user profile
  const fetchProfile = async () => {
    try {

      const response = await api.get("/auth/profile");

      setUser(response.data);

    } catch (error) {

      console.error("Profile Error:", error);

    } finally {

      setLoading(false);

    }
  };



  // Fetch dashboard statistics
  const fetchStats = async () => {

    try {

      const response = await api.get("/dashboard/stats");

      setStats(response.data);

    } catch (error) {

      console.error("Dashboard Stats Error:", error);

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


      <div className="max-w-7xl mx-auto px-6 py-8">


        {/* Welcome Section */}

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white shadow-lg">


          <h1 className="text-4xl font-bold">

            Welcome, {user?.name} 👋

          </h1>


          <p className="mt-3 text-blue-100">

            Manage your store ratings and profile from one place.

          </p>


        </div>




        {/* Dashboard Statistics */}

        <h2 className="text-2xl font-bold mt-10 mb-5">

          Dashboard Overview

        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          <div className="bg-white rounded-xl shadow-lg p-6">

            <h3 className="text-gray-500">

              🏪 Total Stores

            </h3>


            <p className="text-4xl font-bold text-blue-600 mt-3">

              {stats.totalStores}

            </p>


          </div>



          <div className="bg-white rounded-xl shadow-lg p-6">


            <h3 className="text-gray-500">

              ⭐ My Ratings

            </h3>


            <p className="text-4xl font-bold text-yellow-500 mt-3">

              {stats.myRatings}

            </p>


          </div>




          <div className="bg-white rounded-xl shadow-lg p-6">


            <h3 className="text-gray-500">

              🌍 Total Ratings

            </h3>


            <p className="text-4xl font-bold text-green-600 mt-3">

              {stats.totalRatings}

            </p>


          </div>



        </div>





        {/* Profile Information */}

        <h2 className="text-2xl font-bold mt-10 mb-5">

          Profile Information

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          <div className="bg-white rounded-xl shadow-lg p-6">


            <h2 className="text-gray-500">

              Role

            </h2>


            <p className="text-3xl font-bold text-blue-600 mt-2">

              {user?.role}

            </p>


          </div>





          <div className="bg-white rounded-xl shadow-lg p-6">


            <h2 className="text-gray-500">

              Email

            </h2>


            <p className="text-lg font-semibold mt-2 break-all">

              {user?.email}

            </p>


          </div>





          <div className="bg-white rounded-xl shadow-lg p-6">


            <h2 className="text-gray-500">

              Address

            </h2>


            <p className="text-lg font-semibold mt-2">

              {user?.address}

            </p>


          </div>


        </div>







        {/* Quick Actions */}

        <h2 className="text-2xl font-bold mt-10 mb-5">

          Quick Actions

        </h2>




        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">


            <div className="text-5xl">

              🏪

            </div>


            <h3 className="text-2xl font-bold mt-4">

              Stores

            </h3>


            <p className="text-gray-500 mt-2">

              Browse stores and submit ratings.

            </p>


            <Link
              to="/stores"
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >

              View Stores

            </Link>


          </div>






          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">


            <div className="text-5xl">

              ⭐

            </div>


            <h3 className="text-2xl font-bold mt-4">

              Rate Stores

            </h3>


            <p className="text-gray-500 mt-2">

              Give ratings to your favorite stores.

            </p>


            <Link
              to="/stores"
              className="inline-block mt-5 bg-yellow-500 text-white px-5 py-3 rounded-lg hover:bg-yellow-600"
            >

              Rate Now

            </Link>


          </div>






          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">


            <div className="text-5xl">

              👤

            </div>


            <h3 className="text-2xl font-bold mt-4">

              My Profile

            </h3>


            <p className="text-gray-500 mt-2">

              View and update your profile information.

            </p>


            <Link
              to="/profile"
              className="inline-block mt-5 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >

              Open Profile

            </Link>


          </div>



        </div>


      </div>


    </div>

  );

}


export default Dashboard;