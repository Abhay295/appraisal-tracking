import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";


const SignUp = () => {
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    getroles(), getDepartment();
  }, []);

  const submitHandler = async (data) => {
    
    
    try {
      setIsLoading(true)
      const res = await axios.post("/signup", data);
      console.log(res.data);
      if (res.status === 200) {
        toast("✅ Signup successfully", {
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

      setTimeout(()=>{
        navigate("/login");
      },2000)

    } catch (err) {
      setIsLoading(false)
      if(err){
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
    firstnameValidator: {
      required: {
        value: true,
        message: "firstname is required*",
      },
    },
    lastnameValidator: {
      required: {
        value: true,
        message: "lastname is required*",
      },
    },
    emailValidator: {
      required: {
        value: true,
        message: "email is required*",
      },
      pattern: {
        value: /[A-Za-z0-9]+@+[A-Za-z0-9]+\.+[A-Za-z]/,
        message: "Enter valid email*",
      },
    },
    departmentValidator: {
      required: {
        value: true,
        message: "This field is required*",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "password must be required*",
      },
      min: {
        value: 8,
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      },
    },
    contactValidator: {
      required: {
        value: true,
        message: "contact number is required*",
      },
      minLength: {
        value: 10,
        message: "enter correct number",
      },
      maxLength: {
        value: 10,
        message: "Maximum 10 numbers allowed",
      },
    },
    commonValidator: {
      required: {
        value: true,
        message: "This field is required*",
      },
    },
    termValidation: {
      validate: (value) => {
        return value == true || "Accept the T&C*";
      },
    },
  };
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
    //   <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
    //   <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
    //       <div className="grid grid-cols-2 gap-4">
    //         {/* First Name */}
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">First Name</label>
    //           <input
    //             {...register("firstName", { required: "First Name is required" })}
    //             type="text"
    //             className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //           />
    //           {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
    //         </div>

    //         {/* Last Name */}
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Last Name</label>
    //           <input
    //             {...register("lastName", { required: "Last Name is required" })}
    //             type="text"
    //             className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //           />
    //           {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
    //         </div>
    //       </div>

    //       {/* Email */}
    //       <div className="flex flex-col">
    //         <label className="text-gray-700">Email</label>
    //         <input
    //           {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
    //           type="email"
    //           className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //         />
    //         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
    //       </div>

    //       {/* Password */}
    //       <div className="flex flex-col">
    //         <label className="text-gray-700">Password</label>
    //         <input
    //           {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum 6 characters required" } })}
    //           type="password"
    //           className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //         />
    //         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
    //       </div>

    //       {/* Gender & Contact Number */}
    //       <div className="grid grid-cols-2 gap-4">
    //         {/* Gender */}
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Gender</label>
    //           <select
    //             {...register("gender", { required: "Gender is required" })}
    //             className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //           >
    //             <option value="">Select Gender</option>
    //             <option value="male">Male</option>
    //             <option value="female">Female</option>
    //             <option value="other">Other</option>
    //           </select>
    //           {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
    //         </div>

    //         {/* Contact Number */}
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Contact Number</label>
    //           <input
    //             {...register("contactNum", { required: "Contact Number is required", pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" } })}
    //             type="text"
    //             className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //           />
    //           {errors.contactNum && <p className="text-red-500 text-sm">{errors.contactNum.message}</p>}
    //         </div>
    //       </div>

    //       {/* Role Dropdown */}
    //       <div className="flex flex-col">
    //         <label className="text-gray-700">Role</label>
    //         <select
    //           {...register("roleId", { required: "Role is required" })}
    //           className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //         >
    //           <option value="">Select Role</option>
    //           {roles.map((role) => {
    //               return <option value={role._id}>{role.name}</option>;
    //             })}
    //         </select>
    //         {errors.roleId && <p className="text-red-500 text-sm">{errors.roleId.message}</p>}
    //       </div>

    //       {/* Date of Joining */}
    //       <div className="flex flex-col">
    //         <label className="text-gray-700">Date of Joining</label>
    //         <input
    //           {...register("dateOfJoining", { required: "Date of Joining is required" })}
    //           type="date"
    //           className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //         />
    //         {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining.message}</p>}
    //       </div>

    //       {/* Department Dropdown */}
    //       <div className="flex flex-col">
    //         <label className="text-gray-700">Department</label>
    //         <select
    //           {...register("departmentId", { required: "Department is required" })}
    //           className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
    //         >
    //           <option value="">Select Department</option>
    //           {departments.map((department) => {
    //               return (
    //                 <option value={department._id}>{department.name}</option>
    //               );
    //             })}
    //         </select>
    //         {errors.departmentId && <p className="text-red-500 text-sm">{errors.departmentId.message}</p>}
    //       </div>

    //       {/* Submit Button */}
    //       <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
    //         Sign Up
    //       </button>

    //       <p className="text-center text-gray-700 mt-4">
    //         Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
    //       </p>
    //     </form>
    //   </div>
    //   </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-purple-100">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
          {/* Toast Notification */}
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
            Employee Sign Up
          </h2>
  
          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {/* Name Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">First Name</label>
                <input
                  {...register("firstName", { required: "First Name is required" })}
                  type="text"
                  className={`p-3 border rounded-lg ${
                    errors.firstName
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>
  
              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Last Name</label>
                <input
                  {...register("lastName", { required: "Last Name is required" })}
                  type="text"
                  className={`p-3 border rounded-lg ${
                    errors.lastName
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
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
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
  
            {/* Gender & Contact Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender */}
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
                  <p className="text-red-500 text-sm">{errors.gender.message}</p>
                )}
              </div>
  
              {/* Contact Number */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Contact Number</label>
                <input
                  {...register("contactNum", {
                    required: "Contact Number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers allowed",
                    },
                  })}
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                  placeholder="1234567890"
                />
                {errors.contactNum && (
                  <p className="text-red-500 text-sm">{errors.contactNum.message}</p>
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
              <label className="text-gray-700 font-medium">Date of Joining</label>
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
  
            {/* Already Have an Account? */}
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
      </div>
  
    
    
  )
};

export default SignUp;
