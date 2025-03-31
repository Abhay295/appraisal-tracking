import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FaChartLine, FaCheckCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const Login = () => {


  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/login", data);
      console.log(res.data);

      if (res.status === 200) {
        toast("✅ Login successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        setTimeout(() => {
          if (res.data.data.roleId.name === "Developer") {
            navigate("/user");
          } else {
            navigate("/admin");
          }
        }, 2000);
      }
    } catch (err) {
      if (err.status === 401) {
        toast("❌ Invalid credential..", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast("⚠️ Something went wrong...", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const validationSchema = {
    emailValidator: {
      required: {
        value: true,
        message: "Email is required*",
      },
      pattern: {
        value: /[A-Za-z0-9]+@+[A-Za-z0-9]+\.+[A-Za-z]/,
        message: "Enter valid email*",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "Password must be required*",
      },
      min: {
        value: 8,
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      },
    },

  };
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-8 rounded-lg shadow-lg w-96">
    //   <ToastContainer
    //       position="top-right"
    //       autoClose={5000}
    //       hideProgressBar={false}
    //       newestOnTop={false}
    //       closeOnClick={false}
    //       rtl={false}
    //       pauseOnFocusLoss
    //       draggable
    //       pauseOnHover
    //       theme="light"
    //       transition={Bounce}
    //     />
    //     <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

    //     <form onSubmit={handleSubmit(submitHandler)}>
    //       {/* Email Input */}
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Email</label>
    //         <input
    //           type="email"
    //           placeholder="example@gmail.com"
    //           className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //           {...register("email", validationSchema.emailValidator)}
    //         />
    //         <span style={{ color: "red" }}>{errors.email?.message}</span>
    //       </div>

    //       {/* Password Input */}
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Password</label>
    //         <input
    //           type="password"
    //           placeholder="********"
    //           className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //           {...register("password", validationSchema.passwordValidator)}
    //         />
    //         <span style={{ color: "red" }}>{errors.password?.message}</span>
    //       </div>

    //       {/* Login Button */}
    //       <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-4">
    //         Login
    //       </button>
    //     </form>

    //     {/* Forgot Password & Signup Links */}
    //     <div className="text-center mt-4">
    //       <a href="/forgot" className="text-blue-500 hover:underline">
    //         Forgot Password?
    //       </a>
    //       <p className="mt-2 text-gray-600">
    //         New to the system?
    //         <a href="/signup" className="text-blue-500 hover:underline">
    //           Sign up here
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          transition={Bounce}
        />

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          Employee Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-purple-400"
              }`}
              {...register("email", validationSchema.emailValidator)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-purple-400"
              }`}
              {...register("password", validationSchema.passwordValidator)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Signup Links */}
        <div className="text-center mt-4">
          <a
            href="/forgot"
            className="text-sm text-purple-500 hover:underline transition"
          >
            Forgot Password?
          </a>
          <p className="mt-2 text-gray-600 text-sm">
            New to the system?{" "}
            <a
              href="/signup"
              className="text-purple-500 hover:underline font-semibold transition"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>

  
  
  );
};



export default Login;
