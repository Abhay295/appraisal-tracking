// components/ForgotPassword.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Submit Handler
  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const response = await axios.post("/forgot",data);
      console.log(response.data);
      

      if (response.data ) {
        toast.success("Password reset link sent to your email!");
        reset(); // Clear form
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error sending reset link."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full p-2 mt-1 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
