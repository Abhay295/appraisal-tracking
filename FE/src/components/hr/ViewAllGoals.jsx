import React, { useEffect, useState } from "react";
import axios from "axios";

const AllGoalsAdmin = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchAllGoals();
  }, []);

  const fetchAllGoals = async () => {
    try {
      const res = await axios.get("/goals/all");
      setGoals(res.data.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Not Started":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-10">
          🎯 All Employee Goals
        </h2>

        {goals.length === 0 ? (
          <p className="text-center text-gray-500">No goals found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200"
              >
                <div className="mb-1 text-sm text-gray-500">
                  👤 {goal.employeeId?.firstName} {goal.employeeId?.lastName}
                </div>

                <h3 className="text-xl font-semibold text-purple-800 mb-1">
                  {goal.goalName}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {goal.goalDescription}
                </p>

                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <p>📅 Start: {formatDate(goal.startDate)}</p>
                  <p>🗓 End: {formatDate(goal.endDate)}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      goal.status
                    )}`}
                  >
                    {goal.status}
                  </span>
                  <span className="text-[10px] text-gray-400 italic">
                    #{goal._id.slice(-5)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGoalsAdmin;
