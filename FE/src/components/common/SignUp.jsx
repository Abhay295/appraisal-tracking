import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";

const SignUp = () => {
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // 🆕 Image preview state

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // 🆕 To set image manually
  } = useForm();

  const getroles = async () => {
    const res = await axios.get("/roles");
    setRoles(res.data.data);
  };

  const getDepartment = async () => {
    const res = await axios.get("/department/departments");
    setDepartments(res.data.data);
  };

  useEffect(() => {
    getroles();
    getDepartment();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // 🆕 Show image preview
      setValue("image", [file]); // 🆕 Set image in form manually
    }
  };

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("contactNum", data.contactNum);
    formData.append("roleId", data.roleId);
    formData.append("dateOfJoining", data.dateOfJoining);
    formData.append("image", data.image[0]);
    formData.append("departmentId", data.departmentId);
    try {
      setIsLoading(true);
      const res = await axios.post("/signup", formData);
      if (res.status === 200) {
        toast("✅ Signup successfully", {
          position: "top-right",
          autoClose: 1500,
          theme: "light",
          transition: Bounce,
        });
      }

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      toast("⚠️ Something went wrong...", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-purple-100">
      <ToastContainer />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
            Employee Sign Up
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {/* Profile Image Upload with Preview */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                <img
                  src={imagePreview || "https://via.placeholder.com/100"}
                  className="w-28 h-28 object-cover rounded-full border-2 border-purple-500"
                  alt="Profile"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange} // 🆕 Custom handler
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm text-center">
                {errors.image.message}
              </p>
            )}

            {/* First and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">First Name</label>
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  type="text"
                  className={`p-3 border rounded-lg ${
                    errors.firstName
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Last Name</label>
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  type="text"
                  className={`p-3 border rounded-lg ${
                    errors.lastName
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                className={`p-3 border rounded-lg ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                }`}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                })}
                type="password"
                className={`p-3 border rounded-lg ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                }`}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Gender and Contact Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Gender</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">
                  Contact Number
                </label>
                <input
                  {...register("contactNum", {
                    required: "Contact Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit number",
                    },
                  })}
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                  placeholder="1234567890"
                />
                {errors.contactNum && (
                  <p className="text-red-500 text-sm">
                    {errors.contactNum.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Role</label>
              <select
                {...register("roleId", { required: "Role is required" })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.roleId && (
                <p className="text-red-500 text-sm">{errors.roleId.message}</p>
              )}
            </div>

            {/* Date of Joining */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">
                Date of Joining
              </label>
              <input
                {...register("dateOfJoining", {
                  required: "Date of Joining is required",
                })}
                type="date"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              {errors.dateOfJoining && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfJoining.message}
                </p>
              )}
            </div>

            {/* Department */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Department</label>
              <select
                {...register("departmentId", {
                  required: "Department is required",
                })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="text-red-500 text-sm">
                  {errors.departmentId.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg transition duration-300"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-500 hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
