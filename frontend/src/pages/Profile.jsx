import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile");

      setUser(response.data);

      setFormData({
        name: response.data.name,
        email: response.data.email,
        address: response.data.address,
      });
    } catch (error) {
      console.error("Profile Error:", error);

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const response = await api.put(
        "/auth/profile",
        formData
      );

      setUser(response.data.user);

      setEditMode(false);

      toast.success("Profile updated successfully ✅");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update profile");
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

      <div className="p-8">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">

          <div className="flex flex-col items-center">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-3xl font-bold text-blue-600 mt-4">
              My Profile 👤
            </h1>

          </div>

          <div className="mt-8 space-y-6">

            {/* Name */}

            <div>

              <label className="font-semibold text-gray-600">
                Full Name
              </label>

              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="mt-2 text-lg font-semibold">
                  {user.name}
                </p>
              )}

            </div>

            {/* Email */}

            <div>

              <label className="font-semibold text-gray-600">
                Email
              </label>

              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="mt-2 text-lg font-semibold">
                  {user.email}
                </p>
              )}

            </div>

            {/* Address */}

            <div>

              <label className="font-semibold text-gray-600">
                Address
              </label>

              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="mt-2 text-lg font-semibold">
                  {user.address}
                </p>
              )}

            </div>

            {/* Role */}

            <div>

              <label className="font-semibold text-gray-600">
                Role
              </label>

              <div className="mt-3">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  {user.role}
                </span>
              </div>

            </div>

            {/* Buttons */}

            {editMode ? (

              <div className="flex gap-4">

                <button
                  onClick={saveProfile}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    setEditMode(false);

                    setFormData({
                      name: user.name,
                      email: user.email,
                      address: user.address,
                    });
                  }}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>

              </div>

            ) : (

              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>

            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;