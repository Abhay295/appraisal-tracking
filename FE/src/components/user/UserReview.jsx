import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const UserReview = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const reviewerId = localStorage.getItem("id");
  const selectedEmployee = watch("employeeId");

  const [employees, setEmployees] = useState([]);
  const [employeeAppraisals, setEmployeeAppraisals] = useState([]);
  const [myReceivedReviews, setMyReceivedReviews] = useState([]);

  // Load data on mount
  useEffect(() => {
    fetchEmployees();
    fetchMyReceivedReviews();
  }, []);

  // Dependent appraisal list
  useEffect(() => {
    if (selectedEmployee) fetchAppraisalsForEmployee(selectedEmployee);
    else setEmployeeAppraisals([]);
  }, [selectedEmployee]);

  // Fetch all employees
  const fetchEmployees = async () => {
    const res = await axios.get("/alluser");
    setEmployees(res.data.data);
  };

  // Fetch appraisals by employee
  const fetchAppraisalsForEmployee = async (empId) => {
    try {
      console.log(empId);
      const res = await axios.get(`/appraisal/${empId}`);
      setEmployeeAppraisals(res.data.data);
    } catch (err) {
      console.error("Error fetching appraisals", err);
    }
  };

  // Fetch reviews given to me
  const fetchMyReceivedReviews = async () => {
    try {
      const res = await axios.get(`/review/${reviewerId}`);
      setMyReceivedReviews(res.data.data);
    } catch (err) {
      console.error("Error fetching received reviews", err);
    }
  };

  // Submit review
  const onSubmit = async (data) => {
    try {
      data.reviewerId = reviewerId;
      data.reviewDate = new Date();
      await axios.post("/review/add", data);
      reset();
      fetchMyReceivedReviews();
      alert("Review submitted successfully ✅");
    } catch (err) {
      console.error("Error submitting review", err);
      alert("❌ Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Review Form */}
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-12">
        <h2 className="text-xl font-bold text-purple-700 mb-4">📝 Give Review (With Appraisal)</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Employee Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select
              {...register("employeeId", { required: "Employee is required" })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <p className="text-red-500 text-sm">{errors.employeeId.message}</p>
            )}
          </div>

          {/* Appraisal Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appraisal Cycle</label>
            <select
              {...register("appraisalId", { required: "Appraisal is required" })}
              className="w-full border p-2 rounded"
              disabled={!employeeAppraisals.length}
            >
              <option value="">Select Appraisal</option>
              {employeeAppraisals.map((appr) => (
                <option key={appr._id} value={appr._id}>
                  {appr.appraisalCycle}
                </option>
              ))}
            </select>
            {errors.appraisalId && (
              <p className="text-red-500 text-sm">{errors.appraisalId.message}</p>
            )}
          </div>

          {/* Final Rating */}
          <input
            type="number"
            min={1}
            max={5}
            placeholder="Rating (1-5)"
            {...register("finalRating", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.finalRating && <p className="text-red-500 text-sm">Rating is required</p>}

          {/* Strength */}
          <input
            type="text"
            placeholder="Strength"
            {...register("strengths", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.strengths && <p className="text-red-500 text-sm">Strength is required</p>}

          {/* Improvement */}
          <input
            type="text"
            placeholder="Improvement Area"
            {...register("improvementAreas", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.improvementAreas && (
            <p className="text-red-500 text-sm">Improvement is required</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 w-full rounded hover:bg-purple-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* My Received Reviews */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          📥 Reviews Given To Me
        </h2>

        {myReceivedReviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews received yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myReceivedReviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    From: {rev.reviewerId?.firstName} {rev.reviewerId?.lastName}
                  </p>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
                    ⭐ {rev.finalRating}/5
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Strength:</strong> {rev.strengths}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Improvement:</strong> {rev.improvementAreas}
                </p>
                <p className="text-right text-xs text-gray-400 mt-2">
                  {new Date(rev.reviewDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReview;
