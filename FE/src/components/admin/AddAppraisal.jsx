import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const AddAppraisal = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    const res = await axios.get("/alluser");
    console.log(res.data.data);
    setUsers(res.data.data);
    
  };

  useEffect(() => {
    getUser();
  }, []);

  const [appraisalCycles, setAppraisalCycles] = useState([
    "Q1 - Jan to Mar",
    "Q2 - Apr to Jun",
    "Q3 - Jul to Sep",
    "Q4 - Oct to Dec",
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const submitHandler = async (data) => {
    const res = await axios.post("appraisal/add", data);
    toast.success("Appraisal submitted successfully!", {
      position: "top-right",
      autoClose: 1000,
    });
    reset();
  };

  const validatorSchema = {
    commonValidator: {
      required: {
        value: true,
        message: "This field is required*",
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md  ">
        <h2 className="text-2xl font-bold text-center mb-4 text-purple-900">
          Employee Appraisal
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
          {/* Select User */}
          <div className="flex flex-col">
            <label className="text-sm text-purple-900 font-medium mb-1">
              Select Employee
            </label>
            <select
              {...register("userId", { required: "Employee is required" })}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">Select an Employee</option>
              {users.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                );
              })}
            </select>
            {errors.userId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userId.message}
              </p>
            )}
          </div>

          {/* Appraisal Cycle */}
          <div className="flex flex-col">
            <label className="text-sm text-purple-900 font-medium mb-1">
              Appraisal Cycle
            </label>
            <select
              {...register("appraisalCycle", {
                required: "Appraisal Cycle is required",
              })}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">Select Appraisal Cycle</option>
              {appraisalCycles.map((cycle, index) => (
                <option key={index} value={cycle}>
                  {cycle}
                </option>
              ))}
            </select>
            {errors.appraisalCycle && (
              <p className="text-red-500 text-xs mt-1">
                {errors.appraisalCycle.message}
              </p>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-sm text-purple-900 font-medium mb-1">
              Start Date
            </label>
            <input
              {...register("startDate", { required: "Start Date is required" })}
              type="date"
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-sm text-purple-900 font-medium mb-1">
              End Date
            </label>
            <input
              {...register("endDate", { required: "End Date is required" })}
              type="date"
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>

          {/* Overall Rating */}
          <div className="flex flex-col">
            <label className="text-sm text-purple-900 font-medium mb-1">
              Overall Rating
            </label>
            <select
              {...register("overallRating", {
                required: "Overall Rating is required",
              })}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">Select Rating</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Needs Improvement">Needs Improvement</option>
            </select>
            {errors.overallRating && (
              <p className="text-red-500 text-xs mt-1">
                {errors.overallRating.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-2 rounded shadow-lg "
          >
            Submit Appraisal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppraisal;
