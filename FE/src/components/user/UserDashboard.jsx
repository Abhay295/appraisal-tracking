import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const employeeId = localStorage.getItem("id");

  const [employee, setEmployee] = useState(null);
  const [appraisals, setAppraisals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeData();
    }
  }, [employeeId]);

  const fetchEmployeeData = async () => {
    try {
      const [userRes, appraisalRes, goalRes, reviewRes] = await Promise.all([
        axios.get(`/user/${employeeId}`),
        axios.get(`/appraisal/${employeeId}`),
        axios.get(`/goals/${employeeId}`),
        axios.get(`/review/${employeeId}`),
      ]);

      setEmployee(userRes.data.data || {});
      setAppraisals(appraisalRes.data.data || []);
      setGoals(goalRes.data.data || []);
      setReviews(reviewRes.data.data || []);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-100 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          👋 Welcome Back,{" "}
          <span className="text-purple-600">
            {employee?.firstName} {employee?.lastName}
          </span>
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          <StatCard title="Appraisals Completed" value={appraisals.length} color="bg-green-100" icon="📄" />
          <StatCard title="Reviews" value={reviews.length} color="bg-yellow-100" icon="📝" />
          <StatCard title="Active Goals" value={goals.length} color="bg-blue-100" icon="🎯" />
        </div>

        {/* Goals List */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
            🎯 My Current Goals
          </h2>

          {goals.length === 0 ? (
            <p className="text-gray-500">No goals assigned yet.</p>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal._id}
                  className="border border-gray-200 p-4 rounded-md flex justify-between items-center hover:shadow-sm transition"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{goal.goalName}</h4>
                    <p className="text-sm text-gray-500">{goal.goalDescription}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold ${
                      goal.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : goal.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 🎨 Stat Card Component
const StatCard = ({ title, value, color, icon }) => (
  <div className={`rounded-xl p-6 shadow-md hover:shadow-lg transition ${color}`}>
    <div className="flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-800 text-lg font-medium">{title}</h4>
        <p className="text-2xl font-bold text-purple-800">{value}</p>
      </div>
    </div>
  </div>
);

export default UserDashboard
