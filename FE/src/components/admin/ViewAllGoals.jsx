import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllGoals = () => {
    const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("/goals/all");
        setGoals(response.data.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-7xl mx-auto mt-6">
    <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
    All Goals
    </h2>

    <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
      <table className="w-full table-auto bg-white rounded-lg">
        <thead className="bg-purple-100 text-gray-700 text-left">
          <tr>
            <th className="p-4 border-b">Goal Name</th>
            <th className="p-4 border-b">Description</th>
            <th className="p-4 border-b">Start Date</th>
            <th className="p-4 border-b">End Date</th>
            <th className="p-4 border-b">Progress (%)</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Assigned To</th>
          </tr>
        </thead>

        <tbody>
          {goals.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-5 text-gray-500">
                No goals found.
              </td>
            </tr>
          ) : (
            goals.map((goal) => (
              <tr key={goal.id} className="hover:bg-gray-50 transition-all">
                <td className="p-4 border-b">{goal.goalName}</td>
                <td className="p-4 border-b truncate">
                  {goal.goalDescription}
                </td>
                <td className="p-4 border-b">
                  {new Date(goal.startDate).toLocaleDateString()}
                </td>
                <td className="p-4 border-b">
                  {new Date(goal.endDate).toLocaleDateString()}
                </td>
                <td className="p-4 border-b text-center text-purple-700 font-semibold">
                  {goal.progress}%
                </td>
                <td
                  className={`p-4 border-b font-medium ${
                    goal.status === "completed"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {goal.status === "completed"
                    ? "✅ Completed"
                    : "🚧 In Progress"}
                </td>
                <td className="p-4 border-b text-purple-800 font-semibold">
                {goal.employeeId.firstName} {goal.employeeId.lastName}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>

  )
}

export default ViewAllGoals