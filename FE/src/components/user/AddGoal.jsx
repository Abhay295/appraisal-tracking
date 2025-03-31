import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const AddGoal = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      // Add Goal
      const onSubmit = async (data) => {
        try {
          data.employeeId = localStorage.getItem("id")
          await axios.post("/goals/add", data); // POST to add goal
          reset();
          alert("Goal added successfully! 🎯");
        } catch (error) {
          console.error("Error adding goal:", error);
          alert("Failed to add goal. Try again!");
        }
      };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">
          Add New Goal
        </h2>

        {/* Goal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-inner"
        >
          {/* Goal Name */}
          <div>
            <label className="block text-purple-900 font-semibold">
              Goal Name
            </label>
            <input
              {...register("goalName", { required: "Goal Name is required" })}
              type="text"
              placeholder="Enter goal name"
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.goalName && (
              <p className="text-red-500 text-sm">{errors.goalName.message}</p>
            )}
          </div>

          {/* Goal Description */}
          <div>
            <label className="block text-purple-900 font-semibold">
              Goal Description
            </label>
            <textarea
              {...register("goalDescription", {
                required: "Goal Description is required",
              })}
              rows="3"
              placeholder="Enter goal description"
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.goalDescription && (
              <p className="text-red-500 text-sm">
                {errors.goalDescription.message}
              </p>
            )}
          </div>

          {/* Date Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-purple-900 font-semibold">
                Start Date
              </label>
              <input
                {...register("startDate", {
                  required: "Start Date is required",
                })}
                type="date"
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-purple-900 font-semibold">
                End Date
              </label>
              <input
                {...register("endDate", { required: "End Date is required" })}
                type="date"
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Progress & Status */}
          <div className="grid grid-cols-2 gap-4">
            {/* Progress */}
            <div>
              <label className="block text-purple-900 font-semibold">
                Progress (%)
              </label>
              <input
                {...register("progress", {
                  required: "Progress is required",
                  min: { value: 0, message: "Min value is 0" },
                  max: { value: 100, message: "Max value is 100" },
                })}
                type="number"
                placeholder="0-100"
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              {errors.progress && (
                <p className="text-red-500 text-sm">
                  {errors.progress.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-purple-900 font-semibold">
                Status
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">Select Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-3 rounded hover:shadow-lg hover:scale-105 transition-transform"
          >
            Add Goal
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddGoal