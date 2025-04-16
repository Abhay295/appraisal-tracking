import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProfileComponent = () => {
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const userData = {
    fullName: "abhay hingu",
    email: "abhayhingu236@gmail.com",
    contact: "8460204522",
    department: "Admin",
    role: "Admin",
    joiningDate: "2020-11-09",
    profile: "https://via.placeholder.com/100", // fallback profile pic
  };

  useEffect(() => {
    Object.entries(userData).forEach(([key, value]) => {
      setValue(key, value);
    });
    setUploadedImageUrl(userData.profile);
  }, [setValue]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);

    try {
      const res = await axios.post("/profile/upload-profile", formData);
      setUploadedImageUrl(res.data.url);
      alert("✅ Image uploaded successfully");
    } catch (err) {
      console.error("Image upload failed", err);
      alert("❌ Failed to upload image");
    }
  };

  const onSubmit = async (data) => {
    try {
      data.profile = uploadedImageUrl;
      // await axios.put("/profile/update", data);
      console.log("Updated Data:", data);
      alert("✅ Profile updated!");
      setEditMode(false);
    } catch (err) {
      console.error("Profile update error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 px-4 py-12">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl space-y-6">
        <h2 className="text-3xl font-bold text-purple-700 text-center">My Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center">
          <label className="relative cursor-pointer">
            <img
              src={uploadedImageUrl || imagePreview || "https://via.placeholder.com/100"}
              className="w-28 h-28 object-cover rounded-full border-2 border-purple-500"
              alt="Profile"
            />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImagePreview(URL.createObjectURL(file));
                  handleImageUpload(file);
                }}
              />
           
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <InputField label="Full Name" name="fullName" register={register} errors={errors} disabled={!editMode} />
          {/* Email */}
          <InputField label="Email" name="email" type="email" register={register} errors={errors} disabled={!editMode} />
          {/* Contact */}
          <InputField label="Contact" name="contact" register={register} errors={errors} disabled={!editMode} />
          {/* Department */}
          <InputField label="Department" name="department" register={register} errors={errors} disabled={!editMode} />
          {/* Role */}
          <InputField label="Role" name="role" register={register} errors={errors} disabled={!editMode} />
          {/* Joining Date */}
          <InputField label="Joining Date" name="joiningDate" type="date" register={register} errors={errors} disabled={!editMode} />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  Update
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Reusable input field
const InputField = ({ label, name, register, errors, disabled, type = "text" }) => (
  <div>
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      {...register(name, { required: `${label} is required` })}
      className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
      disabled={disabled}
    />
    {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
  </div>
);

export default ProfileComponent;
