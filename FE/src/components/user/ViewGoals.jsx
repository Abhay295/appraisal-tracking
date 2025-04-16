import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const employeeId = localStorage.getItem("id");
      const res = await axios.get(`/goals/${employeeId}`);
      setGoals(res.data.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const updateStatus = async (goal) => {
    let newStatus = goal.status === "Not Started" ? "In Progress" : "Completed";
    try {
      await axios.put(`/goals/update/${goal._id}`, { status: newStatus });
      fetchGoals();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Not Started":
        return "🕒 Not Started";
      case "In Progress":
        return "⚙️ In Progress";
      case "Completed":
        return "✅ Completed";
      default:
        return "❓ Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100   p-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-md">
        🚀 My Goals
      </h1>

      {goals.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No goals found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="backdrop-blur-md bg-white/70 border border-white/30 shadow-xl rounded-xl p-6 transition-transform hover:scale-[1.02]"
            >
              <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {goal.goalName}
                </h3>
                <p className="text-sm text-gray-700 mb-2">{goal.goalDescription}</p>
                <p className="text-sm text-gray-600 italic">
                  📅 {new Date(goal.startDate).toLocaleDateString()} -{" "}
                  {new Date(goal.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    goal.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : goal.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {getStatusBadge(goal.status)}
                </span>

                {goal.status !== "Completed" && (
                  <button
                    onClick={() => updateStatus(goal)}
                    className={`text-xs px-4 py-2 rounded-full font-semibold transition hover:scale-105 ${
                      goal.status === "Not Started"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {goal.status === "Not Started" ? "🚀 Start" : "✅ Complete"}
                  </button>
                )}

                {goal.status === "Completed" && (
                  <span className="text-green-700 font-semibold text-sm">
                    🎉 Done
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewGoals;
