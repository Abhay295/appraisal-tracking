import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Cloudinary Config
  const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset"; // Add your upload preset
  const CLOUDINARY_CLOUD_NAME = "your_cloud_name"; // Add your Cloudinary cloud name

  // Initial form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  // Fetch user data from API
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("/api/profile"); // Replace with your API endpoint
      const profileData = response.data;

      // Set default form values
      reset({
        name: profileData.name,
        email: profileData.email,
        bio: profileData.bio,
        phone: profileData.phone,
        address: profileData.address,
      });

      setProfileImage(profileData.profileImage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setProfileImage(response.data.secure_url);
      setUploading(false);
      console.log("Image uploaded to Cloudinary:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      setUploading(false);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.put("/api/profile", {
        ...data,
        profileImage,
      });
      console.log("Profile updated:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    fetchProfileData(); // Reset with original data
    setIsEditing(false);
  };

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-700 px-6 py-8 sm:py-12 sm:px-10 text-center">
            <h1 className="text-2xl font-bold text-white">User Profile</h1>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="relative group">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                  />
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-sm font-medium">
                        {uploading ? "Uploading..." : "Change"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <div className="flex-grow">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          {...register("name")}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.name ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          {...register("email")}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone")}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.phone ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          {...register("address")}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.address ? "border-red-500" : ""
                          }`}
                        />
                      </div>

                      {/* Bio */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows={3}
                          {...register("bio")}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.bio ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!isDirty || uploading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          !isDirty || uploading
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {uploading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {profileImage?.name || "User Name"}
                      </h2>
                      <p className="text-sm text-gray-500">Frontend Developer</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Email
                        </h3>
                        <p className="text-sm text-gray-900">
                          {profileImage?.email || "example@example.com"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Phone
                        </h3>
                        <p className="text-sm text-gray-900">
                          {profileImage?.phone || "+1234567890"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Address
                        </h3>
                        <p className="text-sm text-gray-900">
                          {profileImage?.address || "123 Main St, USA"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        About
                      </h3>
                      <p className="text-sm text-gray-900">
                        {profileImage?.bio ||
                          "Passionate about creating beautiful user experiences."}
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
