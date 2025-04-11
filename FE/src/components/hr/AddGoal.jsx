import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddGoalHR = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/alluser");
        setEmployees(res.data.data);
      } catch (err) {
        console.error("Error fetching employees", err);
      }
    };
    fetchEmployees();
  }, []);

  const onSubmit = async (data) => {
    try {
      data.status = "Not Started"; 
      await axios.post("/goals/add", data);
      reset();
      toast.success("🎯 Goal Assigned Successfully!");
    } catch (err) {
      console.error("Error assigning goal:", err);
      toast.error("❌ Failed to assign goal.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d5c7f7] to-[#b0d1f9] flex justify-center items-center px-4 py-10">
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
          ✨ Create New Goal
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Employee Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign to Employee
            </label>
            <select
              {...register("employeeId", { required: "Employee is required" })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <p className="text-sm text-red-500">{errors.employeeId.message}</p>
            )}
          </div>

          {/* Goal Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              placeholder="e.g. Learn React Native"
              {...register("goalName", { required: "Goal name is required" })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.goalName && (
              <p className="text-sm text-red-500">{errors.goalName.message}</p>
            )}
          </div>

          {/* Goal Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Description
            </label>
            <input
              type="text"
              placeholder="e.g. Complete all components and animations"
              {...register("goalDescription", { required: "Description is required" })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.goalDescription && (
              <p className="text-sm text-red-500">{errors.goalDescription.message}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate", { required: "Start date is required" })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                {...register("endDate", { required: "End date is required" })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg hover:shadow-lg transition-all"
          >
            Save Goal
          </button>
        </form>
      </div>
      <ToastContainer  position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default AddGoalHR;
