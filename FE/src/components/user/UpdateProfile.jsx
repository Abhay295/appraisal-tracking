import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const UpdateProfile = () => {

    const { register, handleSubmit, setValue } = useForm();
  const [profileData, setProfileData] = useState({});
  const [preview, setPreview] = useState (null);
  const [loading, setLoading] = useState(false);

  // Fetch profile data on load
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axios.get("/api/user/profile");
        setProfileData(data);
        setValue("firstName", data.firstName);
        setValue("lastName", data.lastName);
        setValue("email", data.email);
        setValue("contactNum", data.contactNum);
        setPreview(data.profilePic || "/default-avatar.png");
      } catch (error) {
        toast.error("Failed to load profile data");
      }
    };
    fetchProfileData();
  }, [setValue]);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("profilePic", file);
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("contactNum", data.contactNum);
      if (data.profilePic) {
        formData.append("profilePic", data.profilePic);
      }

      const response = await axios.post("/api/user/update-profile", formData);
      if (response.data.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-6">
          My Profile
        </h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
              
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-gray-700 font-medium">Contact Number</label>
            <input
              type="text"
              {...register("contactNum")}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 text-white bg-purple-600 hover:bg-purple-700 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile