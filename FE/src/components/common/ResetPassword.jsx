// components/ResetPassword.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Submit Handler
  const onSubmit = async (data) => {
    setLoading(true);
    const obj ={
      token:token,
      password: data.password
    }
    
    try {
      const response = await axios.post("/resetpassword",obj);

      if (response.data) {
        toast.success("Password reset successful! Redirecting...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after success
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while resetting password."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password Input */}
          <div>
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`w-full p-2 mt-1 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`w-full p-2 mt-1 border rounded ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 text-white bg-purple-600 hover:bg-purple-700 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="text-center mt-4">
          <a href="/login" className="text-purple-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
